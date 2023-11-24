import React, { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { FlexContainer } from "./components/FlexContainer.styled";
import { store } from "./state/store";
import Navbar from "./containers/navbar/index";
import HomePage from "./containers/homePage";
import LoginPage from "./containers/loginPage";
import ProfilePage from "./containers/profilPage";
import RegisterPage from "./containers/registerPage";
import { loadData } from "./utilities/localStorage";
import { setLogin, setMode } from "./state/reducerSlices/userSlice";
import { FetchUserPosts } from "./hooks/usePosts";

export const websiteName = "Social Media";

function App() {
  //const userId = useSelector((state) => state.global.user._id);
  const dispatch = useDispatch();

  try {
    const savedData = JSON.parse(localStorage.getItem("user"));
    const savedMode = JSON.parse(localStorage.getItem("mode"));

    if (savedData) {
      dispatch(setLogin(savedData));
    }

    if (savedMode) {
      dispatch(setMode(savedMode));
    }
  } catch (error) {
    console.error("Error loading initial data:", error);
  }

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.global.token);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FlexContainer>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  token ? <Navigate to="/home" /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/home"
                element={token ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/register"
                element={token ? <Navigate to="/home" /> : <RegisterPage />}
              />
              <Route
                path="/login"
                element={token ? <Navigate to="/home" /> : <LoginPage />}
              />
              <Route
                path="/profile/:id"
                element={token ? <ProfilePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/friends/"
                element={token ? <h1>friends</h1> : <Navigate to="/login" />}
              />
            </Routes>
          </BrowserRouter>
        </FlexContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
