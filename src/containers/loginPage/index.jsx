import React from "react";
import { Formik } from "formik";
import { websiteName } from "../../App";
import loginSchemas from "../../validationSchemas/login";
import "./loginPage.css";
import { useSelector } from "react-redux";

/** 
function LoginPage() {
  console.log("hello");
  return <div>LoginPage</div>;
}
*/

const LoginPage = function () {
  const token = useSelector((state) => state.token);
  const handleSubmit = async (values, { setSubmitting }) => {
    /*
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
    */
    const response = await fetch(`http://localhost:4000/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(values),
    });
    const islogged = await response.json();
    console.log(JSON.stringify(values), islogged);
  };
  return (
    <>
      <div className=" d-flex align-items-center justify-content-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchemas}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              className="d-flex flex-column align-items-center "
              style={{ width: "400px" }}
              onSubmit={handleSubmit}
            >
              <span className="m-4">welcome to {websiteName}</span>
              <div className="my-3 w-75">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="form-control "
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div className="form-text">{errors.email} </div>
                )}
              </div>
              <div className="my-3 w-75">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  className="form-control "
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
              </div>
              <button
                className="btn btn-primary m-4"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
