"use client";
import { style } from "@/util/style";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import TrailerModal from "./TrailerModal";
import Image from "next/image";

interface MovieData {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

const WhatsPopular = () => {
  const [showBtn, setShowBtn] = useState<number>(0);
  const [movieData, setMovieData] = useState<MovieData[]>([]);

  const btnArray = [
    {
      id: 0,
      title: "In Theaters",
      url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    },
  ];

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

  const [modalHidden, setModalHidden] = useState<{
    id: null | number;
    toggle: boolean;
  }>({
    id: null,
    toggle: false,
  });

  return (
    <div className="w-full xl:px-36 lg:px-12 sm:p-5 sm:px-0 sm:pb-0 pb-0 pt-5">
      <div className={`${style.flex} gap-4 mb-4 sm:pl-10 pl-5`}>
        <h2 className={`${style.h2}`}>What's Popular</h2>
        <ul className="relative flex items-center border-darkBlue border-2 rounded-3xl">
          <span
            className="absolute z-10 h-full bg-darkBlue rounded-3xl transition-all duration-300"
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
                showBtn === item.id && "gradient"
              } text-darkBlue z-20 px-5 text-center transition-all duration-300`}
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
              className="flex-shrink-0 w-[150px] cursor-pointer pb-14"
            >
              <div className="w-full max-h-[250px] h-full relative">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                  width={100}
                  height={50}
                />
                <span className="absolute w-11 h-11 flex justify-center items-center -bottom-[21px] left-3 rounded-full p-2 bg-darkBlue text-white">
                  {Math.floor(item.vote_average * 10)}%
                </span>
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
              <div className="w-full mt-5">
                <h3 className="font-semibold text-black hover:text-movieTitle">
                  {item.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {item.first_air_date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsPopular;
