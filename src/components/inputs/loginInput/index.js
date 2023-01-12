import { ErrorMessage, useField } from "formik";
import React from "react";
import "./loginInput.css";
import { useMediaQuery } from "react-responsive";

export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);
  const desktopView = useMediaQuery({
    query: "(min-width:850px)",
  });
  return (
    <div className="relative flex flex-col items-center w-full">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(4px)" }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              desktopView ? "login_error_arrow_left" : "error_arrow_top"
            }
          ></div>
        </div>
      )}

      <input
        className={`${
          meta.touched && meta.error ? "input_error_border" : ""
        } leading-none border-2 w-full h-10 rounded-md text-lg pl-2 mb-1 text-gray-800`}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              desktopView ? "login_error_arrow_left" : "error_arrow_bottom"
            }
          ></div>
        </div>
      )}
      {meta.touched && meta.error && (
        <img
          src="icons/3_error_icon.png"
          alt=""
          width="20px"
          height="20px"
          style={{ top: !bottom && !desktopView && "62%" }}
        />
      )}
    </div>
  );
}
