"use client";
import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { releaseDate } from "@/util/constants";
import RelDate from "./RelDate";

const ReleaseDate = () => {
  const [check, setCheck] = useState(releaseDate);

  const handleCheck = (id: number) => {
    setCheck((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className={`border-t p-4`}>
      <p className="text-gray-700 mb-3">Release Dates</p>
      {check.map((item) => {
        return (
          <button
            onClick={() => handleCheck(item.id)}
            key={item.id}
            className={`flex items-center gap-2 w-full p-2 ${
              item.id === 1 || !check[0].checked ? "block" : "hidden"
            }`}
          >
            <span
              className={`w-5 h-5 flex items-center justify-center border-2 border-movieTitle ${
                item.checked ? "bg-movieTitle" : ""
              }`}
            >
              {item.checked && <CheckIcon className="text-white" />}
            </span>
            <span>{item.title}</span>
          </button>
        );
      })}
      <RelDate />
    </div>
  );
};

export default ReleaseDate;
