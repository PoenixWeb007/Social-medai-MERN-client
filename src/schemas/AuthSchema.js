import * as Yup from "yup";
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  //.matches(passwordRules, "Please create a stronger password"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("required")
    .max(15, "First name must be at most 15 characters"),

  lastName: Yup.string()
    .required("required")
    .max(20, "Last name must be at most 20 characters"),
  Location: Yup.string().max(20, "Last name must be at most 20 characters"),
  occupation: Yup.string().max(20, "Last name must be at most 20 characters"),

  email: Yup.string().email("Invalid email address").required("required"),

  password: Yup.string().required("required"),
  //.min(8, "Password must be at least 8 characters")
  // .matches(
  //   passwordRules,
  //   "Password requires uppercase, lowercase, digit, and special character."
  // ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  acceptedTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});
