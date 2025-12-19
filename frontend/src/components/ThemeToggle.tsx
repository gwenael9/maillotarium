import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/theme/useTheme";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle Theme">
      {darkMode ? <Sun /> : <Moon />}
    </Button>
  );
}