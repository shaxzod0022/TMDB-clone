"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import AllMovies from "./AllMovies";
import { usePathname } from "next/navigation";
import path from "path";
import { navLinks } from "@/util/constants";

const Movies = () => {
  const [key, setKey] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const pathname = usePathname();
  console.log(title);

  useEffect(() => {
    if (pathname) {
      const currentKey = pathname.split("/").pop();
      setKey(currentKey || "");
    }
  }, [pathname]);

  useEffect(() => {
    if (key) {
      const foundLink = navLinks
        .flatMap((item) => item.links)
        .find((link) => link.url === key);
      const foundTitle = foundLink?.title || "";
      setTitle(foundTitle);
    }
  }, [key]);

  return (
    <div className={`w-full xl:px-36 lg:px-12 sm:p-5 sm:pb-0 pb-0 pt-5 mt-20`}>
      <h2 className={`text-[25px] font-semibold  capitalize sm:p-0 px-5 mb-4`}>
        {title} Movies
      </h2>
      <div className="flex items-start flex-wrap gap-5 sm:p-0 p-5">
        <Filter />
        <AllMovies />
      </div>
    </div>
  );
};

export default Movies;
