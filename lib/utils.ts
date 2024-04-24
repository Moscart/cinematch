import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IStringLimiter } from "./type";
import { removeStopwords, ind } from "stopword";

const { Stemmer, Tokenizer } = require("sastrawijs");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api = {
  fetch: async <T>(
    url: string,
    options?: {
      method?: "GET" | "POST" | "PUT" | "DELETE";
      body?: any;
      withoutAuth?: boolean;
    }
  ): Promise<T> => {
    const defaultOptions: RequestInit = {
      method: options?.method ?? "GET",
      headers: {
        accept: "application/json",
        ...(options?.withoutAuth
          ? {}
          : {
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            }),
      },
      ...options,
    };

    if (defaultOptions.method === "GET") {
      delete defaultOptions.body;
    }

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  },
};

export const stringLimiter = ({ text, length }: IStringLimiter): string => {
  if (text.length <= length) {
    return text;
  }

  const truncatedText = text.substring(0, length - 3) + "...";

  return truncatedText;
};

export const nlp = ({ text }: { text: string }) => {
  const stemmer = new Stemmer();
  const tokenizer = new Tokenizer();
  const words = removeStopwords(tokenizer.tokenize(text), ind);
  const finalResult = words.map((word) => {
    return stemmer.stem(word);
  });
  return finalResult;
};
