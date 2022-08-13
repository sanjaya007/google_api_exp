import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Results from "./Results";
import Search from "./Search";

const Routers = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Navigate to={"/search"} />}></Route>
        {["/search", "/image", "/news", "/videos"].map((value, index) => (
          <Route path={value} element={<Results />} key={index}></Route>
        ))}
      </Routes>
    </div>
  );
};

export default Routers;
