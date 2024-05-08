import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { nlp } from "@/lib/utils";
import prisma from "@/prisma/client";

export default async function Sample({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  //Keywords Pengguna
  const keywords = `${searchParams.keywords}`;
  const filterKeywords = nlp({ text: keywords });

  const data = await prisma.movie.findMany({
    select: {
      id: true,
      original_title: true,
      words: true,
    },
  });

  //Kata Pada Film
  const words = data.map((movie) => movie.words.split(", "));
  if (keywords) {
    words.unshift(filterKeywords);
  }
  const flatWords = words.flat();
  const filterWords = Array.from(new Set(flatWords));

  //Frekuensi Keywords
  const queryFrequency = filterKeywords.map((word) => {
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
    const wordsFrequency = filterKeywords.map((word) => {
      const wordsLength = words.length;
      const totalWords = words.filter((wordMovie) => word === wordMovie).length;
      const frequency = totalWords / wordsLength;
      return frequency;
    });
    return wordsFrequency;
  });

  //Dokumen Frekuensi
  const totalFrequency = [queryFrequency, ...dataFrequency];
  const maxLength = Math.max(...totalFrequency.map((arr) => arr.length));
  const documentFrequency = Array.from({ length: maxLength }, (_, i) =>
    totalFrequency.reduce((count, arr) => count + (arr[i] !== 0 ? 1 : 0), 0)
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
  const dataTitle = data.map((movie) => movie.original_title);
  const pairedArray: [number, string][] = cosineSimilarity.map(
    (value, index) => [value, dataTitle[index]]
  );

  pairedArray.sort((a, b) => b[0] - a[0]);

  const sortedSimilarity = pairedArray.map((pair) => pair[0]);
  const sortedTitle = pairedArray.map((pair) => pair[1]);

  return (
    <main className="min-h-screen">
      <div className="p-24">
        <h1 className="text-center mb-8">Frekuensi</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Kata</TableHead>
              <TableHead className="min-w-[100px]">Query</TableHead>
              {data.map((movie, index) => {
                return (
                  <TableHead className="min-w-[100px]" key={movie.id}>{`Film ${
                    index + 1
                  }`}</TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterKeywords.map((word, index) => (
              <TableRow key={word}>
                <TableCell className="font-medium">{word}</TableCell>
                <TableCell>{queryFrequency[index]}</TableCell>
                {data.map((movie, indexData) => {
                  return (
                    <TableCell key={movie.id}>
                      {dataFrequency[indexData][index]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-24">
        <h1 className="text-center mb-8">
          Dokumen Frekuensi dan Invers Dokumen Frekuensi
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kata</TableHead>
              <TableHead>Dokumen Frekuensi</TableHead>
              <TableHead>Invers Dokumen Frekuensi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterKeywords.map((word, index) => (
              <TableRow key={word}>
                <TableCell className="font-medium">{word}</TableCell>
                <TableCell>{documentFrequency[index]}</TableCell>
                <TableCell>{inverseDocumentFrequency[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-24">
        <h1 className="text-center mb-8">Bobot TF-IDF</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kata</TableHead>
              <TableHead className="min-w-[100px]">Query</TableHead>
              {data.map((movie, index) => {
                return (
                  <TableHead className="min-w-[100px]" key={movie.id}>{`Film ${
                    index + 1
                  }`}</TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterKeywords.map((word, index) => (
              <TableRow key={word}>
                <TableCell className="font-medium">{word}</TableCell>
                <TableCell>{bobotQuery[index]}</TableCell>
                {data.map((movie, indexData) => {
                  return (
                    <TableCell key={movie.id}>
                      {bobotData[indexData][index]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-24">
        <h1 className="text-center mb-8">Bobot Query * Bobot Dokumen</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kata</TableHead>
              {data.map((movie, index) => {
                return (
                  <TableHead className="min-w-[100px]" key={movie.id}>{`Film ${
                    index + 1
                  }`}</TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterKeywords.map((word, index) => (
              <TableRow key={word}>
                <TableCell className="font-medium">{word}</TableCell>
                {data.map((movie, indexData) => {
                  return (
                    <TableCell key={movie.id}>
                      {bobotQueryDocument[indexData][index]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              {data.map((movie, index) => {
                return (
                  <TableCell key={movie.id}>
                    {totalBobotQueryDocument[index]}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="p-24">
        <h1 className="text-center mb-8">Panjang Vektor</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Kata</TableHead>
              <TableHead className="min-w-[100px]">Query</TableHead>
              {data.map((movie, index) => {
                return (
                  <TableHead className="min-w-[100px]" key={movie.id}>{`Film ${
                    index + 1
                  }`}</TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterKeywords.map((word, index) => (
              <TableRow key={word}>
                <TableCell className="font-medium">{word}</TableCell>
                <TableCell>{vectorQuery[index]}</TableCell>
                {data.map((movie, indexData) => {
                  return (
                    <TableCell key={movie.id}>
                      {vectorData[indexData][index]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{totalVectorQuery}</TableCell>
              {data.map((movie, index) => {
                return (
                  <TableCell key={movie.id}>{totalVectorData[index]}</TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              <TableCell>Akar</TableCell>
              <TableCell>{akarVectorQuery}</TableCell>
              {data.map((movie, index) => {
                return (
                  <TableCell key={movie.id}>{akarVectorData[index]}</TableCell>
                );
              })}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="p-24">
        <h1 className="text-center mb-8">Cosine Similarity</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Similarity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((movie, index) => {
              return (
                <TableRow key={movie.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{movie.original_title}</TableCell>
                  <TableCell>{cosineSimilarity[index]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="p-24">
        <h1 className="text-center mb-8">Rekomendasi</h1>
        <p className="mb-4">
          <span className="font-bold">Kata kunci</span>: {keywords}
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Similarity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTitle.map((title, index) => {
              return (
                <TableRow key={title}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{sortedSimilarity[index]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
