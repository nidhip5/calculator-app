import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div
      className="w-[340px] h-[540px] p-3 rounded-xl bg-[#485461]"
      style={{
        backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
      }}
    >
      Wrapper
    </div>
  );
};

export default Wrapper;
