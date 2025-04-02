"use client";
import React, { FC } from "react";
interface Props {
  title?: string;
  onClick?: () => void;
  newClass?: string;
  disabled?: boolean;
  key?: number;
}
const Btn: FC<Props> = ({ title, newClass, onClick, disabled, key }) => {
  return (
    <button
      key={key}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl py-1 px-3 ${newClass}`}
    >
      {title}
    </button>
  );
};

export default Btn;
