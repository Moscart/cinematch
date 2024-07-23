import React from "react";
import { Tilt } from "react-tilt";
import moment from "moment";
import "moment/locale/id";
import { CardImage } from "./card_image";
import Score from "./score";

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
            className="grid gap-2"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <p className="text-sm font-bold transition-all">{title}</p>
            <p className="text-xs font-extralight">
              {moment(releaseDate).locale("id").format("MMMM D, YYYY")}
            </p>
          </div>
          <div
            className="absolute -right-2 -top-14"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            <Score vote={vote} />
          </div>
        </div>
      </div>
    </Tilt>
  );
};
