import { Switch } from "@progress/kendo-react-inputs";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function ModeToggle() {
    const { switcher, currentTheme } = useThemeSwitcher();

    const toggleTheme = () => {
        const theme = currentTheme === 'dark' ? 'light' : 'dark';
        switcher({ theme: theme });
        localStorage.setItem('theme', theme);
    };

    const isDarkMode = currentTheme === 'dark';

    return (
        <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            onLabel="⏾"
            offLabel="☀︎"
        />
    );
}
