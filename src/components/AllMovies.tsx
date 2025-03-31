import React, { useEffect, useState } from "react";
import TrailerModal from "./TrailerModal";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { usePathname } from "next/navigation";
import path from "path";
interface MovieData {
  id: number;
  original_title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}
const AllMovies = () => {
  const [movieData, setMovieData] = useState<MovieData[]>([]);

  const [key, setKey] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setKey(path.basename(pathname));
    }
  }, [pathname]);

  useEffect(() => {
    if (key) {
      const url = `https://api.themoviedb.org/3/movie/${key}?language=en-US&page=1`;
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
          setMovieData(response.data.results);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [key]);

  const [modalHidden, setModalHidden] = useState<{
    id: null | number;
    toggle: boolean;
  }>({
    id: null,
    toggle: false,
  });

  return (
    <div className="sm:w-[75%] w-full flex flex-wrap gap-5">
      {movieData.map((item) => {
        return (
          <div
            key={item.id}
            className="flex-shrink-0 sm:w-[169px] w-full flex sm:flex-col flex-row cursor-pointer border-2 rounded-lg shadow-md"
          >
            <div className="sm:w-full w-[60%] max-h-[250px] sm:h-full h-[180px] relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.original_title}
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute sm:flex hidden w-11 h-11 justify-center items-center -bottom-[21px] left-3 rounded-full p-2 bg-darkBlue text-white">
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
                className={`sm:flex hidden rounded-full w-6 h-6 cursor-pointer absolute top-3 right-3 bg-gray-300 hover:bg-movieTitle text-darkBlue items-center`}
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
            <div className="w-full sm:mt-5 sm:p-3 p-5">
              <h3 className="font-semibold text-black hover:text-movieTitle">
                {item.original_title}
              </h3>
              <span className="text-sm text-gray-500">{item.release_date}</span>
              <p className="text-sm mt-4 sm:hidden block">
                {item.overview.slice(0, 70)}...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllMovies;
