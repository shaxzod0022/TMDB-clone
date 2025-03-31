import { style } from "@/util/style";
import React from "react";

const Search = () => {
  return (
    <div
      className={`mt-[70px] w-full ${style.flex} gap-4 lg:px-[140px] border-b-2 border-black py-2 px-5`}
    >
      <span>
        <img
          src="/assets/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg"
          alt="search"
          width={30}
          height={30}
        />
      </span>
      <input
        type="text"
        className="outline-none sm:w-[90%] w-[80%] text-[20px] p-2"
        placeholder="Search for a movie, tv show, person..."
      />
    </div>
  );
};

export default Search;
