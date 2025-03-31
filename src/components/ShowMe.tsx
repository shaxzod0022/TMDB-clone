"use client";
import React, { useState } from "react";
import { style } from "@/util/style";

const ShowMe = () => {
  const [showMe, setShowMe] = useState([
    { id: 1, title: "Everything", checked: true },
    { id: 2, title: "Movies", checked: false },
    { id: 3, title: "TV Shows", checked: false },
  ]);

  const setShowCheck = (id: number) => {
    setShowMe((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, checked: !item.checked }
          : { ...item, checked: false }
      )
    );
  };

  return (
    <div className={`border-t p-4`}>
      <p className="text-gray-700 mb-3">Show Me</p>
      {showMe.map((item) => {
        return (
          <button
            onClick={() => setShowCheck(item.id)}
            key={item.id}
            className={`${style.flex} gap-2 w-full`}
          >
            <span
              className={`w-4 h-4 rounded-full ${
                item.checked
                  ? "border-4 border-movieTitle"
                  : "border-2 border-gray-400"
              }`}
            ></span>
            <span>{item.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ShowMe;
