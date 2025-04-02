"use client";
import React, { useState } from "react";
import Btn from "./Btn";

const Genres = () => {
  const [active, setActive] = useState<number[]>([]);
  const searchKey =
    "Action Adventure Animation Comedy Crime Documentary Drama Family Fantasy History Horror Music Mystery Romance Science Fiction TV Movie Thriller War Western";

  const toggleGenre = (idx: number): void => {
    setActive((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  return (
    <div className={`border-t p-4`}>
      <p className="text-gray-700 mb-3">Genres</p>
      {searchKey.split(" ").map((item, idx) => (
        <Btn
          key={idx}
          onClick={() => toggleGenre(idx)}
          newClass={`border border-gray-400 hover:text-white hover:bg-movieTitle hover:border-movieTitle font-normal m-1 text-black ${
            active.includes(idx) && "bg-movieTitle border-movieTitle text-white"
          }`}
          title={item}
        />
      ))}
    </div>
  );
};

export default Genres;
