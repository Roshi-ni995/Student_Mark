// ThemeButton.jsx
import { useTheme } from "../context/ThemeContext";
function ThemeButton() {
    const { theme, toggleTheme } = useTheme();
     return (
          <button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"}
          </button>
     );
    }
    export default ThemeButton;