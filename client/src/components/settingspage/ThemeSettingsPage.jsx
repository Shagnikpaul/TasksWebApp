import React from 'react'
import { useTheme } from "@heroui/use-theme";
import { Button } from '@heroui/button';



function ThemeSettingsPage() {

    const { theme, setTheme } = useTheme();

    return (
        <div>
            The current theme is: {sessionStorage.getItem("theme")} <br />
            <Button onPress={() => {
                sessionStorage.setItem("theme", "light")
                setTheme("light")
            }}>Light Mode</Button>
            <Button onPress={() => {
                sessionStorage.setItem("theme", "dark")
                setTheme('dark')
            }}>Dark Mode</Button>
        </div>
    )
}

export default ThemeSettingsPage