import { createContext } from "react";
import type { ThemeContextType } from "./type";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);