import { useEffect } from 'react';

const THEME_MODE = 'theme-mode';
const defaultTheme = 'dark';
// const darkTheme = 'dark';
const lightTheme = 'light';

const useDarkMode = () => {
    const storeThemeToLs = (themeMode: string) => {
        localStorage.setItem(THEME_MODE, themeMode);
    };
    const readThemeFromLs = () => {
        return localStorage.getItem(THEME_MODE) || '';
    };

    const updateTheme = (newTheme: string, previousTheme?: string) => {
        const { classList } = document.documentElement;
        if (previousTheme) classList.remove(previousTheme);
        classList.add(newTheme);
    };

    const toggleTheme = () => {
        const previousTheme = readThemeFromLs();
        const newTheme = previousTheme === defaultTheme ? lightTheme : defaultTheme;
        updateTheme(newTheme, previousTheme);
        storeThemeToLs(newTheme);
    };

    useEffect(() => {
        const oldTheme = readThemeFromLs();
        if (oldTheme) {
            return updateTheme(oldTheme);
        }

        updateTheme(defaultTheme);
        storeThemeToLs(defaultTheme);

        return undefined;
    }, []);

    return { toggleTheme };
};

export default useDarkMode;
