import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./containers/homePage";
import LoginPage from "./containers/loginPage";
import ProfilePage from "./containers/profilPage";
import Navbar from "./containers/navbar";
export const token = 1;
export const websiteName = "Social Media";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
