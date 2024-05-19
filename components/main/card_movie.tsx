import React from "react";
import { Tilt } from "react-tilt";
import moment from "moment";
import "moment/locale/id";
import { CardImage } from "./card_image";

interface ICardMovie {
  title: string;
  vote: number;
  releaseDate: string;
  posterPath: string;
}

export const CardMovie: React.FC<ICardMovie> = ({
  title,
  vote,
  releaseDate,
  posterPath,
}) => {
  const defaultOptions = {
    reverse: true, // reverse the tilt direction
    max: 15, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  const movieVote = Math.ceil(vote * 10);

  const getColor = (movieVote: number, dark: boolean = false) => {
    let colorClass;
    if (movieVote >= 70) {
      colorClass = !dark ? "--green" : "--dark-green";
    } else if (movieVote >= 40) {
      colorClass = !dark ? "--yellow" : "--dark-yellow";
    } else if (movieVote > 0) {
      colorClass = !dark ? "--red" : "--dark-red";
    } else {
      colorClass = !dark ? "--red" : "--gray";
    }
    return colorClass;
  };

  return (
    <Tilt
      options={defaultOptions}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="transition-all ease-linear"
    >
      <div
        className="group"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <CardImage
          alt={title}
          posterPath={posterPath}
          className="shadow-[0_0_55px_10px_rgba(0,0,0,0),_0_0_15px_2px_rgba(0,0,0,0)] group-hover:shadow-primary/50 transition-all ease-in-out delay-0 duration-500"
        />
        <div
          className="relative mt-5"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="flex flex-col gap-2"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p className="text-sm font-bold transition-all">{title}</p>
            <p className="text-xs font-extralight">
              {moment(releaseDate).locale("es").format("MMMM D, YYYY")}
            </p>
          </div>
          <div
            className="absolute -right-2 -top-14"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full"
              aria-valuenow={90}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{
                background: `radial-gradient(closest-side, hsl(var(--background)) 65%, transparent 70% 80%, hsl(var(--background)) 85% 100%), conic-gradient(var(${getColor(
                  movieVote
                )}) ${movieVote}%, var(${getColor(movieVote, true)}) 0)`,
              }}
            >
              <div
                className={`font-bold text-[0.85rem] ${
                  movieVote > 0
                    ? "after:content-['%'] after:font-light after:text-[.45rem] after:align-text-bottom"
                    : ""
                }`}
              >
                {movieVote > 0 ? movieVote : "NR"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};
