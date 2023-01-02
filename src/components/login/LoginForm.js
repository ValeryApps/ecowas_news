import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput";
import { PulseLoader } from "react-spinners";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { login_user } from "../../firebase_api/AuthApi";

const loginInfo = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [login, setLogin] = useState(loginInfo);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { email, password } = login;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string().required("Password is required").min(6),
  });
  const submitLogin = async () => {
    try {
      setLoading(true);
      await login_user(email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      if (
        error.message === "Firebase: Error (auth/user-not-found)." ||
        error.message === "Firebase: Error (auth/wrong-password)."
      )
        setError("Wrong email or password");
      setLoading(false);
    }
  };
  return (
    <div className="mt-auto">
      <div className=" content-center">
        <div className="w-[300px]">
          <div className="login_2_wrap">
            <h1 className="text-2xl font-bold text-teal-800">Login to E24</h1>
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
              onSubmit={submitLogin}
            >
              {(_) => (
                <Form>
                  <LoginInput
                    placeholder="Email or phone number"
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                  />
                  <div className="relative">
                    <LoginInput
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleInputChange}
                      // bottom
                    />
                    <div
                      className="absolute bottom-4 right-2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </div>
                  </div>
                  <button type="submit" className="blue_btn">
                    {loading ? "Logging you in" : "Sign In"}
                    {loading && <PulseLoader color="white" />}
                  </button>
                </Form>
              )}
            </Formik>
            {error && <h6 className="login_error">{error}</h6>}
            <Link to="/reset" className="forgot_password">
              forgotten password?
            </Link>
            <div className="sign_splitter"></div>
            <button
              className="blue_btn open_signup"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
