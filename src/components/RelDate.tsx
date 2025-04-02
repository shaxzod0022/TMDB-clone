import { style } from "@/util/style";
import { CalendarIcon } from "@heroicons/react/24/outline";
import React from "react";

const RelDate = () => {
  return (
    <div className={`${style.flexColumn} gap-4`}>
      <div className={`${style.flexBetween} gap-2`}>
        <span className="text-gray-400">from</span>
        <div className={``}>
          <input
            type="text"
            className={`border border-gray-400 outline-none rounded-md p-2 active::border-movieTitle`}
          />
          <button>
            <CalendarIcon className="text-gray-900" />
          </button>
        </div>
      </div>
      <div className={`${style.flexBetween} gap-2`}>
        <span className="text-gray-400">to</span>
        <div className={``}>
          <input
            type="text"
            value={`${new Date()}`}
            className={`border border-gray-400 outline-none rounded-md p-2 active::border-movieTitle`}
          />
          <button>
            <CalendarIcon className="text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelDate;
