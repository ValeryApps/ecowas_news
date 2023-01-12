import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import RegisterInput from "../inputs/registerInput";
import { PulseLoader } from "react-spinners";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { register_user } from "../../firebase_api/AuthApi";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [register, setRegister] = useState(userInfo);
  const navigate = useNavigate();
  const { first_name, last_name, email, password } = register;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };
  const registerValidation = Yup.object({
    first_name: Yup.string().required("What first name is required"),
    last_name: Yup.string().required("What last name is required"),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });
  const submitRegister = async () => {
    try {
      setLoading(true);
      await register_user(register);
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).");
      setError("Sorry, this email is already in taken!");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="register">
        <div className=" flex flex-col items-center">
          <span className="text-3xl font-bold text-teal-800">
            Sign Up For Free
          </span>
          <span>It is very quick and easy</span>
        </div>
        <Formik
          initialValues={{
            first_name,
            last_name,
            email,
            password,
          }}
          enableReinitialize
          validationSchema={registerValidation}
          onSubmit={submitRegister}
        >
          {(_) => (
            <Form className="">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  name="first_name"
                  placeholder="User name"
                  onChange={handleRegisterChange}
                  value={first_name}
                  // className="w-full"
                />
                <RegisterInput
                  type="text"
                  name="last_name"
                  placeholder="User name"
                  onChange={handleRegisterChange}
                  value={last_name}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  name="email"
                  placeholder="Mobile number or Email Address"
                  onChange={handleRegisterChange}
                  value={email}
                />
              </div>
              <div className="relative">
                <RegisterInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  onChange={handleRegisterChange}
                  value={password}
                  // className="w-full"
                />
                <div
                  className="absolute bottom-4 right-4 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>

              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and
                <span>Cookie Policy.</span> You may receive SMS notifications
                from un and opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button
                  type="submit"
                  className="blue_btn open_signup"
                  disabled={loading}
                >
                  {loading ? " Signing you Up" : "Sign Up"}
                  {loading && <PulseLoader color="white" />}
                </button>
              </div>

              {error && (
                <h6 className="text-center font-semibold text-red-700">
                  {error}
                </h6>
              )}
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-blue-900">
                  Sign in
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      {/* register */}
    </div> /*blur*/
  );
};

export default RegisterForm;
