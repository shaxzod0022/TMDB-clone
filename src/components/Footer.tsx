"use client";
import { footerlinks } from "@/util/constants";
import { style } from "@/util/style";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      className={`relative w-full bg-darkBlue flex flex-wrap gap-10 !items-start md:py-10 py-10 !pb-14 px-10 sm:justify-center justify-start`}
    >
      <div className={`${style.flexColumn} md:gap-10 gap-5 items-start`}>
        <Image
          src="/assets/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b (1).svg"
          alt="TMDB logo"
          width={100}
          height={50}
        />
        <button
          className={`bg-white text-movieTitle rounded-md px-6 py-2 text-lg font-bold`}
        >
          Hi User!
        </button>
      </div>
      {footerlinks.map((item, idx) => {
        return (
          <div key={idx}>
            <h3 className={`text-white font-bold uppercase text-lg`}>
              {item.title}
            </h3>
            <ul>
              {item.links.map((item, idx) => {
                return (
                  <li key={idx} className={`text-white hover:text-gray-500`}>
                    <Link href={item.url}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <p className="absolute bottom-2 left-[50%] -translate-x-[50%] text-blue-800">
        Build 36c7039 (8441)
      </p>
    </div>
  );
};

export default Footer;
