"use client";
import { style } from "@/util/style";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sort from "./Sort";
import ShowMe from "./ShowMe";
import ReleaseDate from "./ReleaseDate";
import Genres from "./Genres";
import Language from "./Language";
import Btn from "./Btn";

const Filter = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <div className={`sm:w-[23%] w-full bg-white`}>
      <Sort />
      <div className={`shadow-md border-2 rounded-md mt-5`}>
        <button
          onClick={() => setHidden((i) => !i)}
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
        <div className={`${hidden ? "hidden" : "block"}`}>
          <ShowMe />
          <ReleaseDate />
          <Genres />
          <p className="p-4 border text-gray-800">Certification</p>
          <Language />
        </div>
      </div>
      <Btn
        newClass="w-full bg-movieTitle text-white hover:bg-darkBlue !py-2 font-bold mt-3"
        title="Search"
      />
    </div>
  );
};

export default Filter;
