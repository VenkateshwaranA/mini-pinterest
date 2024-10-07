import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "./Home";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await axios
        .post("http://localhost:3030/users/login", data)
        .then((res) => {
          console.log("register", res);
          setIsLogin(true);
          // navigate("/home");
          let user = localStorage.getItem("user");
          if (!user) {
            localStorage.setItem("user", JSON.stringify(res.data));
          } else {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.log("error in register", err);

          toast.error("Please check Username and Password");
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isLogin ? (
        <Home />
      ) : (
        <div className="max-w-md mx-auto mt-24 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: true })}
                  className="w-full p-2 border rounded"
                />
                {errors.username && (
                  <p className="text-red-500">Username is required</p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
