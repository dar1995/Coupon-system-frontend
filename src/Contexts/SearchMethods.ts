
import { Theme } from "../Models/ThemeType";


export const addThemeClass = (themeState: Theme) => {
   setTimeout(() => {
      const theme = themeState;
      const elements = document.querySelectorAll(".MuiMenu-paper");
      console.log(elements);
      elements.forEach(e => e.classList.add(theme));
   }, 0)

};

export function getEnumValuesAsStringArray<T extends Record<string, number | string>>(enumObj: T): string[] {
   return Object.values(enumObj).filter((value) => typeof value === 'string') as string[];
}


