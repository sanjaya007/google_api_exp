import React from "react";
import { Puff } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 314px)" }}
    >
      <Puff color="#00BFFF" width={80} height={80} />
    </div>
  );
};

export default Loading;
