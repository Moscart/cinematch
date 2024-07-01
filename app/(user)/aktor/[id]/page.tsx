"use client";

import { CardImage } from "@/components/main/card_image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { translateToId } from "@/lib/serverUtils";
import { Cast, CrewDouble, MovieDetail } from "@/lib/type";
import { api } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { animatePageOut } from "../../animation";
import { useRouter } from "next/navigation";

export default function AktorPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const [data, setData] = useState<MovieDetail | null>(null);
  const [dataCrew, setDataCrew] = useState<{
    [department: string]: CrewDouble[];
  }>({});
  const router = useRouter();

  useEffect(() => {
    getDetailMovie();
  }, []);

  const getDetailMovie = async () => {
    const aktor: MovieDetail = await api.fetch(`/api/movie/aktor/${params.id}`);
    translateToId([aktor.overview, aktor.tagline]).then((res) => {
      const dataTranslate = JSON.parse(res);
      const newData = {
        ...aktor,
        overview: dataTranslate[0].text,
        tagline: dataTranslate[1].text,
      };
      setData(newData);
    });
    getCrew(aktor.credits.crew);
  };

  const getCrew = (crew: Cast[]) => {
    const result: { [department: string]: CrewDouble[] } = {};

    crew.forEach((person) => {
      const department = person.department ?? "";
      if (!result[department]) {
        result[department] = [];
      }

      const existingPerson = result[department].find(
        (p: any) => p.original_name === person.original_name
      );

      if (existingPerson) {
        existingPerson.job?.push(person.job!);
      } else {
        result[department].push({
          ...person,
          original_name: person.original_name,
          job: [person.job ?? ""],
        });
      }
    });

    Object.values(result).forEach((departmentCrew) => {
      departmentCrew.forEach((item) => {
        item.job = Array.from(new Set(item.job));
      });
    });

    const sortedResult = Object.fromEntries(
      Object.entries(result)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([department, crew]) => [
          department,
          crew
            .sort((a, b) => a.original_name.localeCompare(b.original_name))
            .sort((a, b) => a.job!.join("").localeCompare(b.job!.join(""))),
        ])
    );

    setDataCrew(sortedResult);
  };

  return (
    <main>
      {data && (
        <div className="max-w-screen-xl mx-auto">
          <div className="pt-24">
            <div className="flex gap-5">
              <CardImage
                posterPath={data.poster_path}
                alt={`${data.title}`}
                className="w-28"
              />
              <Card className="p-5 flex gap-5 flex-col w-full justify-center">
                <div className="">
                  <div className="text-2xl">
                    <span className="font-bold me-2">
                      {data.original_title}
                    </span>
                    <span className="text-muted-foreground">
                      ({moment(data.release_date).format("YYYY")})
                    </span>
                  </div>
                  <p className="font-light text-sm">{data.title}</p>
                </div>
                <Button
                  onClick={() =>
                    animatePageOut(`/detail//${params.id}`, router)
                  }
                  className="w-max p-0 bg-transparent hover:bg-transparent hover:text-white/60"
                >
                  <div className="flex items-center font-bold">
                    <ArrowLeft className="size-4 me-2" strokeWidth={4} />
                    Back to main
                  </div>
                </Button>
              </Card>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2">
            <div className="">
              <h4 className="mb-5">
                Cast{" "}
                <span className="text-muted-foreground">
                  {data.credits.cast.length}
                </span>
              </h4>
              {data.credits.cast.length ? (
                data.credits?.cast.map((castMember) => (
                  <div className="flex gap-5 mb-3" key={castMember.id}>
                    <CardImage
                      className="w-16"
                      posterPath={castMember.profile_path}
                      alt={castMember.original_name}
                      defaultImage="/no_image.png"
                    />
                    <div className="self-center">
                      <p className="text-sm font-bold">
                        {castMember.original_name}
                      </p>
                      <p className="text-xs font-light">
                        {castMember.character}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-5">Tidak ada cast</p>
              )}
            </div>
            <div className="">
              <h4 className="mb-5">
                Crew{" "}
                <span className="text-muted-foreground">
                  {Object.values(dataCrew).flat().length}
                </span>
              </h4>
              <div className="flex flex-col gap-8">
                {Object.keys(dataCrew).length ? (
                  Object.keys(dataCrew).map((department) => (
                    <div className="" key={department}>
                      <div className="font-bold mb-3">{department}</div>
                      {dataCrew[department].map((crewMember) => (
                        <div className="flex gap-5 mb-3" key={crewMember.id}>
                          <CardImage
                            className="w-16"
                            posterPath={crewMember.profile_path}
                            alt={crewMember.original_name}
                            defaultImage="/no_image.png"
                          />
                          <div className="self-center">
                            <p className="text-sm font-bold">
                              {crewMember.original_name}
                            </p>
                            <p className="text-xs font-light">
                              {crewMember.job?.join(", ")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p className="mt-5">Tidak ada crew</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
