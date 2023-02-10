import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { Input } from "../../components/inputs/Input";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register_user } from "../../firebase_api/AuthApi";

const initialValue = {
  username: "",
  email: "",
  password: "",
};
export const SignUp = () => {
  const [user, setUser] = useState(initialValue);
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const { username, email, password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const validate = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(22),
  });
  const handleSubmit = async () => {
    try {
      await register_user(user);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).")
        toast.error(
          "Sorry, this email is already in use. Please try another one"
        );
    }
  };
  console.log(email);
  return (
    <div className=" mx-auto md:w-[40%] sm:w-[75%] w-full shadow-md p-4 h-fit my-4 rounded-md bg-white">
      <h1 className="text-center text-3xl text-teal-700  px-3 py-2">
        Welcome to E24 news
      </h1>
      <Formik
        enableReinitialize
        validationSchema={validate}
        initialValues={{ username, email, password }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="w-full flex flex-col gap-4">
            <div className="relative">
              <FaUser className="top-3.5 left-2 absolute" />
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <AiOutlineMail className="top-3.5 left-2 absolute" />
              <Input
                type="text"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <FiLock className="top-3.5 absolute left-2" />
              <Input
                type={isPassword ? "password" : "text"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              {!isPassword ? (
                <ImEye
                  className="top-3.5 absolute right-2 cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              ) : (
                <ImEyeBlocked
                  className="top-3.5 absolute right-2 cursor-pointer"
                  onClick={() => setIsPassword(!isPassword)}
                />
              )}
            </div>
            <button
              type="submit"
              className={`${
                !isValid || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed text-black"
                  : "bg-teal-800 text-white"
              } mx-auto w-fit font-bold text-lg px-5  lg:px-20 py-2  rounded-tl-full rounded-br-full`}
              disabled={isSubmitting || !isValid}
            >
              Sign up
            </button>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-800">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
