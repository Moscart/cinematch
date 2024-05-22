import React from "react";

export default function Score({ vote }: { vote: number }) {
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
  );
}
