import AppRoutes from "./AppRoutes";
import {useEffect} from "react";

const THEME_STORAGE_KEY = "theme";

function getInitialIsDark() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function App() {
  useEffect(() => {
    const isDark = getInitialIsDark();
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
  }, []);

  return <AppRoutes />;
}

export default App;
