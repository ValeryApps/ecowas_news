import { useField } from "formik";
import React from "react";

export const Input = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full">
      <input
        type={field.type}
        name={field.name}
        {...field}
        {...props}
        className={`w-full py-2 px-8 border-2 rounded-md bg-slate-100 focus:bg-white  mb-2 ${
          meta.touched && meta.error
            ? "border-red-600"
            : "border-slate-100 outline-emerald-300"
        } `}
      />
      {meta.touched && meta.error && (
        <div className="text-red-600">{meta.error}</div>
      )}
    </div>
  );
};

export const Select = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="w-full">
      <select
        name={field.name}
        value={field.value}
        onChange={(e, data) => field.onChange(data.value)}
        {...field}
        {...props}
        className={`w-full py-2.5 px-10 border-2 rounded-md bg-slate-100 focus:bg-white mb-2 ${
          meta.touched && meta.error
            ? "border-red-600"
            : "border-slate-300 outline-1 outline-emerald-300"
        }`}
      >
        {props.children}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-600">{meta.error}</div>
      )}
    </div>
  );
};
