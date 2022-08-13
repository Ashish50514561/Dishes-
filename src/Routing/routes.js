import React from "react";
import { Routes, Route } from "react-router-dom";
import Dishes from "../Components/Dishes/Dishes";
import Results from "../Components/Dishes/Results";
import Login from "../Components/User_login/Login";

export default function routes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route exact path="/Dishes" element={<Dishes />} />
      <Route exact path="/results" element={<Results />} />
    </Routes>
  );
}
