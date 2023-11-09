import React from "react";
import * as yup from "yup";
//const passwordRules = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const loginSchemas = yup.object().shape({
  email: yup
    .string()
    .email("veuillez entrer un email valide ")
    .required("champ obligatoire"),
  password: yup
    .string()
    .min(5, "vous devez entrer 5 caractères au minimum")
    .required("champ obligatoire"),
});

export default loginSchemas;
