import React, { useMemo } from "react";
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
import { setLogin } from "./state/reducerSlices/userSlice";

export const websiteName = "Social Media";

function App() {
  const dispatch = useDispatch();
  const dataFromLocalStorage = loadData("user");
  if (dataFromLocalStorage) {
    dispatch(setLogin(dataFromLocalStorage));
  }
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.global.token);
  return (
    <FlexContainer>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                element={token ? <HomePage /> : <Navigate to="/" />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/login"
                element={token ? <Navigate to="/" /> : <LoginPage />}
              />
              <Route
                path="/profile/:id"
                element={token ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </FlexContainer>
  );
}

export default App;
