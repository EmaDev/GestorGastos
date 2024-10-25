import { useEffect, useState } from 'react'

export const useTheme = () => {

    const [isDark, setIsDark] = useState<boolean>(true);

    useEffect(() => {
        const userTheme = localStorage.getItem("theme");
        if (userTheme == undefined || userTheme == "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.add("light");
            setIsDark(false);
        }
    }, []);

    const changeTheme = (value: boolean) => {
        setIsDark(value);
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
        if (value) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    }


    return { isDark, changeTheme };
}
