"use client";
import { navLinks } from "@/util/constants";
import { style } from "@/util/style";
import React, { useState } from "react";

interface Props {
  newClass?: string;
}

const ModalMenu: React.FC<Props> = ({ newClass }) => {
  const [hiddenMenu, setHiddenMenu] = useState<number | null>(null);
  return (
    <div
      className={`absolute ${newClass} top-[75px] p-5 h-[100vh] z-50 w-[80%] bg-darkBlue ${style.flexColumn} items-start`}
    >
      <ul className={`${style.flexColumn} w-full h-full gap-8`}>
        {navLinks.map((item, idx) => {
          return (
            <li
              key={idx}
              className={`text-white w-fit font-bold cursor-pointer`}
              onClick={() =>
                setHiddenMenu((i) => (i === item.id ? null : item.id))
              }
            >
              {item.title}
              <ul
                className={`${
                  hiddenMenu === item.id ? "block" : "hidden"
                } ml-5`}
              >
                {item.links.map((link, idx2) => {
                  return (
                    <li
                      className={`text-gray-400 hover:text-white font-semibold`}
                      key={idx2}
                    >
                      {link.title}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
        <button className="text-white font-semibold w-fit">Login</button>
      </ul>
    </div>
  );
};

export default ModalMenu;
