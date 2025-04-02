"use client";
import { language } from "@/util/constants";
import { style } from "@/util/style";
import React, { useState } from "react";

const Language = () => {
  const [selected, setSelected] = useState<string>("None selected");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (title: string) => {
    setSelected(title);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <p className="text-gray-800 mb-3">Language</p>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full p-3 rounded-md bg-gray-300 ${style.flexBetween}`}
        >
          <span>{selected}</span>
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

        {isOpen && (
          <div className="absolute top-full mt-2 rounded-md border left-[50%] -translate-x-[50%] w-[90%] bg-white z-10 shadow-md">
            {language.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.title)}
                className={`w-full text-start transition-all duration-100 hover:bg-gray-200 px-3 py-2 ${
                  selected === item.title && "bg-movieTitle text-white"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Language;
