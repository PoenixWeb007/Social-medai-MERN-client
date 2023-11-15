import { TextField } from "@mui/material";
import React from "react";

function Field({ formik, id, label, type, name }) {
  return (
    <TextField
      error={formik.errors[name] && formik.touched[name]}
      type={type}
      md={{ display: "inline" }}
      id={id}
      label={label}
      helperText={formik.touched[name] && formik.errors[name]}
      {...formik.getFieldProps(`${name}`)}
    />
  );
}

export default Field;
