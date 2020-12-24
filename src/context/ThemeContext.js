import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const Theme = () => {
  return useContext(ThemeContext);
};

const getTheme = () => {
  var darktheme = localStorage.getItem("darktheme");

  switch (darktheme) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return false;
  }
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getTheme());

  return (
    <ThemeContext.Provider value={[darkMode, setDarkMode]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
