import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const styles = {
    errorStyle: { color: "red", fontSize: ".9rem", whiteSpace: "pre-wrap" }
  };
  return (
    <div className="mb-4">
      {!placeholder && <label htmlFor={field.name}>{label}</label>}
      {!placeholder && (
        <input
          className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...props}
        />
      )}
      {placeholder && (
        <input
          placeholder={placeholder}
          className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"}`}
          {...field}
          {...props}
        />
      )}

      <div style={styles.errorStyle}>
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};
