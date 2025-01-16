import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Cadastro } from "../pages/cadastro";
import { Home } from "../pages/home";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/cadastro" element={<Cadastro />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default AppRoutes;
