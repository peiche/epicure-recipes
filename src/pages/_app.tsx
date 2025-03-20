import { AppProps } from 'next/app';
import '@progress/kendo-theme-default/dist/all.css';
import '../styles/main.scss';
import { useEffect, useState } from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';

const themes = {
    light: '/styles/epicure-recipes-theme-light.css',
    dark: '/styles/epicure-recipes-theme-dark.css',
};

export default function App({ Component, pageProps }: AppProps) {
    const [themeState, setThemeState] = useState("light");

    useEffect(() => {
        document.body.classList.add('k-body');

        if (typeof window !== "undefined") {
            const currentTheme = localStorage.getItem("theme") || "light";
            setThemeState(currentTheme);
        }
    }, []);

    return (
        <ThemeSwitcherProvider
            themeMap={themes}
            defaultTheme={themeState}
        >
            <Component {...pageProps} />
        </ThemeSwitcherProvider>
    );
}
