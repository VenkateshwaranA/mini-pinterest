import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// import { redirect, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";


const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isRegister, setIsRegiter] = useState(false);
  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await axios
        .post("http://localhost:3030/users/register", data)
        .then((res) => {
          console.log("register", res);
          setIsRegiter(true);
        })
        .catch((err) => {
          console.log("error in register", err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const redirect = () => {
    setIsRegiter(true);
  };
  return (
    <>
      {isRegister ? (
        <LoginForm />
      ) : (
        <div className="max-w-md mx-auto mt-24 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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

                <p  className=" mt-5 flex flex-row-reverse font text-base text-red-500 cursor-pointer" onClick={redirect}>Login</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
