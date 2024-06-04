"use server";

import translate from "google-translate-api-x";
import { textPreprocessing } from "./utils";
import prisma from "@/prisma/client";
import { Movie } from "@prisma/client";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function translateToId(text: string | string[]) {
  const res = await translate(text, { to: "id" });
  return JSON.stringify(res);
}

export async function recommendation(keywords: string) {
  //Keywords Pengguna
  const filterKeywords = textPreprocessing({ text: keywords });

  const data = await prisma.movie.findMany();

  //Kata Pada Film
  const words = data.map((movie) => movie.words.split(", "));
  if (keywords) {
    words.unshift(filterKeywords);
  }
  const flatWords = words.flat();
  const filterWords = Array.from(new Set(flatWords));

  //Frekuensi Keywords
  const queryFrequency = filterWords.map((word) => {
    const keywordsLength = filterKeywords.length;
    const totalWords = filterKeywords.filter(
      (keyword) => keyword === word
    ).length;
    const frequecy = totalWords / keywordsLength;
    return frequecy;
  });

  //Frekuensi Kata Pada Film
  const dataFrequency = data.map((movie) => {
    const words = movie.words.split(", ");
    const wordsFrequency = filterWords.map((word) => {
      const wordsLength = words.length;
      const totalWords = words.filter((wordMovie) => word === wordMovie).length;
      const frequency = totalWords / wordsLength;
      return frequency;
    });
    return wordsFrequency;
  });

  //Dokumen Frekuensi
  const totalFrequency = [...dataFrequency];
  const maxLength = Math.max(...totalFrequency.map((arr) => arr.length));
  const documentFrequency = Array.from(
    { length: maxLength },
    (_, i) =>
      totalFrequency.reduce((count, arr) => count + (arr[i] !== 0 ? 1 : 0), 0) +
      1
  );

  //Invers Dokumen Frekuensi
  const totalData = data.length;
  const inverseDocumentFrequency = documentFrequency.map((frequency) =>
    Math.log10(totalData / frequency)
  );

  //Bobot TF-IDF
  const bobotQuery = queryFrequency.map(
    (tf, index) => tf * inverseDocumentFrequency[index]
  );

  const bobotData = dataFrequency.map((data) => {
    const tf = data.map((tf, index) => {
      return tf * inverseDocumentFrequency[index];
    });
    return tf;
  });

  //Bobot Query * Bobot Dokumen
  const bobotQueryDocument = bobotData.map((bd) => {
    const bobotQD = bd.map((bobot, index) => {
      return bobot * bobotQuery[index];
    });
    return bobotQD;
  });

  const totalBobotQueryDocument = bobotQueryDocument.map((arr) =>
    arr.reduce((sum, num) => sum + num, 0)
  );

  //Panjang Vektor
  const vectorQuery = bobotQuery.map((bq) => Math.pow(bq, 2));

  const vectorData = bobotData.map((bd) =>
    bd.map((bobot) => Math.pow(bobot, 2))
  );

  const totalVectorQuery = vectorQuery.reduce((sum, num) => sum + num, 0);

  const totalVectorData = vectorData.map((vd) =>
    vd.reduce((sum, num) => sum + num, 0)
  );

  const akarVectorQuery = Math.sqrt(totalVectorQuery);

  const akarVectorData = totalVectorData.map((tvd) => Math.sqrt(tvd));

  //Cosine Similarity
  const cosineSimilarity = totalBobotQueryDocument.map((tqd, index) => {
    return tqd / (akarVectorQuery * akarVectorData[index]);
  });

  //Rekomendasi
  const pairedArray: [number, Movie][] = cosineSimilarity.map(
    (value, index) => [value, data[index]]
  );

  pairedArray.sort((a, b) => b[0] - a[0]);

  const filteredArray = pairedArray.filter(([similarity]) => similarity !== 0);
  const top10Array = filteredArray.slice(0, 10);

  const top10Similarity = top10Array.map(([similarity]) => similarity);
  const top10Movies = top10Array.map(([, movie]) => movie);

  return JSON.stringify(top10Movies);
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/auth/login" });
}

export const signInWithCreds = async (
  email: string,
  password: string,
  redirect: boolean = false
) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect,
    });
  } catch (error) {
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      let message = "";
      switch (type) {
        case "CredentialsSignin":
          message = "Invalid credentials.";
          break;
        case "CallbackRouteError":
          message = cause?.err?.toString() as string;
          break;
        default:
          message = "Something went wrong.";
          break;
      }
      return { errorMessage: message };
    }
    throw error;
  }
};
