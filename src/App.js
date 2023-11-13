import React, { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./containers/homePage";
import LoginPage from "./containers/loginPage";
import ProfilePage from "./containers/profilPage";
import Navbar from "./containers/navbar";
import { Provider, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { FlexContainer } from "./components/FlexContainer.styled";
import { store } from "./state/store";
export const token = 1;
export const websiteName = "Social Media";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.token);
  return (
    <FlexContainer>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={token ? <HomePage /> : <Navigate to="/" />}
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
