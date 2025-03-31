"use client";
import { style } from "@/util/style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import ShowMe from "./ShowMe";
import ReleaseDate from "./ReleaseDate";
import Genres from "./Genres";

const Filter = () => {
  const [key, setKey] = useState<string>("");
  const [movieData, setMovieData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentHash = window.location.hash;
      setKey(currentHash);
    }
  }, []);

  useEffect(() => {
    if (key) {
      const url = `https://api.themoviedb.org/3/movie/${key.slice(
        1
      )}?language=en-US&page=1`;
      const option = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWY0Y2NiMjMzMjNlMmY2ZmYzYTljNTIxNzAxYTRlZSIsIm5iZiI6MTcxNTkyNTcxMi42NDEsInN1YiI6IjY2NDZmMmQwZjZkOGFjYzZlM2UwODk5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gELWP81lEi8krrjWptEs1ld-N36Y4johvr04wp_kFls",
        },
      };

      axios(url, option)
        .then((response) => {
          setMovieData(response.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [key]);

  return (
    <div className={`sm:w-[23%] w-full bg-white`}>
      <Sort />
      <div className={`shadow-md border-2 rounded-md mt-5`}>
        <button
          className={`font-semibold text-md w-full text-start p-4 ${style.flexBetween}`}
        >
          <span>Filter</span>
          <span
            style={{
              width: "0",
              height: "0",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "7px solid black",
            }}
          ></span>
        </button>
        <div>
          <ShowMe />
          <ReleaseDate />
          <Genres />
        </div>
      </div>
    </div>
  );
};

export default Filter;
