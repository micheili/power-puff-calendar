import React, { useEffect, useContext } from "react";
//import themeChanger from "../sass/_themeChanger.scss";
import { Context } from "../App";

export default function ThemeChanger() {
  const [context, updateContext] = useContext(Context);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      updateContext({
        colorTheme: currentThemeColor,
      });
    }
  }, []);

  const handleClick = (theme) => {
    updateContext({
      colorTheme: theme,
    });
    localStorage.setItem("theme-color", theme);
  };

  return (
    <div className="theme-options">
      <div
        id="theme-pink"
        onClick={() => handleClick("theme-pink")}
        className={`${context.colorTheme === "theme-pink" ? "active" : ""}`}
      ></div>
      <div
        id="theme-blue"
        onClick={() => handleClick("theme-blue")}
        className={`${context.colorTheme === "theme-blue" ? "active" : ""}`}
      ></div>
      <div
        id="theme-black"
        onClick={() => handleClick("theme-black")}
        className={`${context.colorTheme === "theme-black" ? "active" : ""}`}
      ></div>
       <div
        id="theme-neon"
        onClick={() => handleClick("theme-neon")}
        className={`${context.colorTheme === "theme-neon" ? "active" : ""}`}
      ></div>
    </div>
  );
}
