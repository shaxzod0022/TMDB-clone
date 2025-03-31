import {
  Bars3Icon as ListIcon,
  HeartIcon,
  EyeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  newClass?: string;
}

const TrailerModal: React.FC<Props> = ({ newClass }) => {
  const modals = [
    { id: 1, title: "Add to list", icon: <ListIcon className="h-5 w-5" /> },
    { id: 2, title: "Favorite", icon: <HeartIcon className="h-5 w-5" /> },
    { id: 3, title: "Watchlist", icon: <EyeIcon className="h-5 w-5" /> },
    { id: 4, title: "Your rating", icon: <StarIcon className="h-5 w-5" /> },
  ];
  return (
    <div
      className={`${newClass} flex flex-col items-start z-30 absolute top-12 -right-3 w-fit bg-white rounded-md border-2`}
    >
      {modals.map((item, idx) => {
        return (
          <button
            key={item.id}
            className={`w-full font-semibold rounded-md text-sm text-start flex gap-2 hover:bg-darkBlue transition-all duration-200 hover:text-white px-4 py-2 ${
              modals.length === idx ? "border-none" : "border-b-2"
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TrailerModal;
