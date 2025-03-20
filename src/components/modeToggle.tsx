import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@progress/kendo-react-buttons";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function ModeToggle() {
    const { switcher, currentTheme } = useThemeSwitcher();

    const toggleTheme = () => {
        const theme = currentTheme === 'dark' ? 'light' : 'dark';
        switcher({ theme: theme });
        localStorage.setItem('theme', theme);
    };

    return (
        <Button
            onClick={toggleTheme}
            size='large'
            fillMode='outline'
            rounded='full'
            startIcon={<FontAwesomeIcon icon={currentTheme === 'dark' ? faMoon : faSun} width={16} height={16} />}
            className="k-ml-2"
        />
    );
}
