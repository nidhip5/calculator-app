import React from "react";
import { Textfit } from "react-textfit";

const Screen = ({ value }) => {
  return (
    <Textfit
      className="h-24 w-full mb-2.5 py-0 px-2.5 bg-[#4357692d] rounded-xl flex items-center justify-end text-white font-bold box-border"
      mode="single"
      max={70}
    >
      {value}
    </Textfit>
  );
};

export default Screen;
