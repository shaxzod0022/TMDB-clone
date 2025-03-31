import React, { useEffect, useState } from "react";
import { popularity } from "@/util/constants";
import { style } from "@/util/style";

const Sort = () => {
  const [selectedPopularity, setSelectedPopularity] = useState<{
    title: string;
    toggle: boolean;
    toggle2: boolean;
  }>({ title: "Popularity Descending", toggle: false, toggle2: false });

  const selectedPop = (title: string, toggle2: boolean): void =>
    toggle2
      ? setSelectedPopularity({
          title: title,
          toggle: !selectedPopularity.toggle,
          toggle2: !selectedPopularity.toggle2,
        })
      : setSelectedPopularity({
          title: title,
          toggle: !selectedPopularity.toggle,
          toggle2: selectedPopularity.toggle2,
        });

  return (
    <div className={`shadow-md border-2 rounded-md`}>
      <button
        onClick={() => selectedPop(selectedPopularity.title, true)}
        className={`font-semibold text-md w-full text-start p-4 ${style.flexBetween}`}
      >
        <span>Sort</span>
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
      <div
        className={`border-t p-4 relative ${
          selectedPopularity.toggle2 ? "block" : "hidden"
        }`}
      >
        <p className="text-gray-700 mb-3">Sort Results By</p>
        <button
          onClick={() => selectedPop(selectedPopularity.title, false)}
          className={`w-full p-3 rounded-md bg-gray-300 ${style.flexBetween}`}
        >
          <span>{selectedPopularity.title}</span>
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
        <div
          className={`${
            selectedPopularity.toggle ? "hidden" : "block"
          } absolute -bottom-60 rounded-md border left-[50%] -translate-x-[50%] w-[90%] bg-white z-10`}
        >
          {popularity.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => selectedPop(item.title, false)}
                className={`w-full ${
                  selectedPopularity.title === item.title &&
                  "bg-movieTitle text-white"
                } text-start transition-all duration-100 hover:bg-gray-200 px-3 py-2`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sort;
