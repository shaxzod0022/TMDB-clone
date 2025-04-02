"use client";
import { style } from "@/util/style";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import TrailerModal from "./TrailerModal";
import Image from "next/image";

interface MovieData {
  id: number;
  original_name: string;
  vote_average: number;
  backdrop_path: string;
  name: string;
}

const LatesTraillers = () => {
  const [showBtn, setShowBtn] = useState<number>(0);
  const btnArray = [
    {
      id: 0,
      title: "Popular",
      url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    },
    {
      id: 1,
      title: "Theaters",
      url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    },
  ];

  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NWY0Y2NiMjMzMjNlMmY2ZmYzYTljNTIxNzAxYTRlZSIsIm5iZiI6MTcxNTkyNTcxMi42NDEsInN1YiI6IjY2NDZmMmQwZjZkOGFjYzZlM2UwODk5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gELWP81lEi8krrjWptEs1ld-N36Y4johvr04wp_kFls",
    },
  };

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(btnArray[showBtn].url, options);
      setMovieData(response.data.results);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  }, [showBtn]);

  useEffect(() => {
    getData();
  }, [getData]);

  const [hoverMovie, setHoverMovie] = useState<string>(
    "/81FKp9UMwZZ7Xk2ksV6z8qjG6pU.jpg"
  );

  const [modalHidden, setModalHidden] = useState<{
    id: null | number;
    toggle: boolean;
  }>({
    id: null,
    toggle: false,
  });

  return (
    <div
      className="w-full xl:px-36 lg:px-12 sm:p-5 sm:pb-0 sm:px-0 pb-0 pt-5"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(3, 37, 65, 0.7), rgba(3, 37, 65, 0.7)), url("https://image.tmdb.org/t/p/w500${hoverMovie}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`${style.flex} gap-4 mb-4 sm:pl-10 pl-5`}>
        <h2 className={`${style.h2} text-white`}>Lates Trailers</h2>
        <ul className="relative flex items-center border-movieTitle border-2 rounded-3xl">
          <span
            className="absolute z-10 h-full bg-movieTitle rounded-3xl transition-all duration-300"
            style={{
              width: `${100 / btnArray.length}%`,
              transform: `translateX(${showBtn * 100}%)`,
            }}
          ></span>
          {btnArray.map((item) => (
            <li
              key={item.id}
              onClick={() => setShowBtn(item.id)}
              className={`cursor-pointer font-semibold ${
                showBtn === item.id ? "text-darkBlue" : "text-movieTitle"
              } z-20 px-5 text-center transition-all duration-300`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex overflow-y-hidden gap-5 overflow-x-scroll trending sm:pl-10 p-5">
        {movieData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-[280px] cursor-pointer transition-all duration-300 hover:scale-105 pb-4"
              onMouseOver={() => setHoverMovie(item.backdrop_path)}
            >
              <div className="w-full max-h-[170px] h-full relative">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.original_name}
                  className="w-full h-full object-cover rounded-lg"
                  width={100}
                  height={50}
                />
                <button
                  onClick={() =>
                    setModalHidden((i) => ({
                      ...i,
                      id: item.id,
                      toggle: !i.toggle,
                    }))
                  }
                  className={`rounded-full w-6 h-6 cursor-pointer absolute top-3 right-3 bg-gray-300 hover:bg-movieTitle text-darkBlue flex items-center`}
                >
                  <EllipsisHorizontalIcon />
                </button>
                <TrailerModal
                  newClass={`${
                    modalHidden.id === item.id && modalHidden.toggle
                      ? "flex"
                      : "hidden"
                  }`}
                />
              </div>
              <div className="w-full mt-2 text-center">
                <h3 className="font-bold text-white">{item.name}</h3>
                <span className="text-sm font-semibold text-gray-200">
                  {item.original_name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatesTraillers;
