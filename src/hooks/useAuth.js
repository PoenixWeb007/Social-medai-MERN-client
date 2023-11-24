import { Navigate } from "react-router-dom";
import { APIEndPoints, api } from "../utilities/APIEndpoints";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/reducerSlices/userSlice";

const registerPath = APIEndPoints().auth.register;
const loginPath = APIEndPoints().auth.login;

export function fetchRegister({ values, setError, setIsSucceeded }) {
  return new Promise((resolve, reject) => {
    fetch(registerPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setIsSucceeded(false);
          reject(data.error); // reject the promise in case of an error
        } else {
          const userName = data;
          setIsSucceeded(true);
          setError(null);
          resolve(userName); // resolve the promise with the userName
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        reject(error); // reject the promise in case of a fetch error
      });
  });
}

export function fetchLogin(values, setError, dispatch) {
  fetch(loginPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((r) => r.json())
    .then((r) => {
      console.log(r);
      if (r.err) {
        setError(r.err);
      } else {
        dispatch(setLogin(r));
        localStorage.setItem("user", JSON.stringify(r));
        setError(null);
        Navigate("/home");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
