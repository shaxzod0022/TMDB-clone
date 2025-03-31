"use client";
import { style } from "@/util/style";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Head = () => {
  const [movieImg, setMovieImg] = useState<string>("");
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWY0Y2NiMjMzMjNlMmY2ZmYzYTljNTIxNzAxYTRlZSIsIm5iZiI6MTcxNTkyNTcxMi42NDEsInN1YiI6IjY2NDZmMmQwZjZkOGFjYzZlM2UwODk5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gELWP81lEi8krrjWptEs1ld-N36Y4johvr04wp_kFls",
    },
  };
  const getData = async () => {
    try {
      const response = await axios.get(url, options);
      if (response.data.results.length === 0) {
        console.error("Ma'lumotlar topilmadi.");
        return;
      }
      const randomIndex = Math.floor(
        Math.random() * response.data.results.length
      );
      const selectedMovie = response.data.results[randomIndex];
      if (selectedMovie && selectedMovie.backdrop_path) {
        setMovieImg(selectedMovie.backdrop_path);
      } else {
        console.error("Tanlangan filmda rasm manzili mavjud emas.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      className={`${style.flexColumn} gap-4 items-start w-full xl:w-[85%] md:py-32 py-20 md:px-10 px-6 mx-auto`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url("https://image.tmdb.org/t/p/w500${movieImg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="gradient text-5xl font-bold">
        That's a <br /> Wrap 2024
      </h1>
      <p className="text-white">The best (and worst) of the year from TMDB.</p>
      <button className="border-2 border-white rounded-3xl px-3.5 hover:bg-white transition-all duration-100 active:bg-slate-400 hover:text-darkBlue text-white pb-0.5">
        check it out
      </button>
    </div>
  );
};

export default Head;
