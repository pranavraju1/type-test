import React from "react";
import { GlobalStyles } from "./Styles/global";
import TypingBox from "./Components/TypingBox";

import Footer from "./Components/Footer";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import Header from "./Components/Header";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

const App = () => {


  const {theme} = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
