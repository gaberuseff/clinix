import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {Button} from "./ui/button";
import {SidebarTrigger} from "./ui/sidebar";

const THEME_STORAGE_KEY = "theme";

function getInitialIsDark() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function AppHeader() {
  const [isDark, setIsDark] = useState(getInitialIsDark);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((current) => !current);

  return (
    <header className="flex h-14 items-center border-b px-4">
      <SidebarTrigger />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={toggleTheme}
        className="ml-auto"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </header>
  );
}

export default AppHeader;
