import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("user"));
console.log('userId',userId);

  return (
    <>{userId ? <Home /> : <RegisterForm />}</>

    //     <Route path="/" element={<RegisterForm />} />
    //     <Route path="/home" element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
