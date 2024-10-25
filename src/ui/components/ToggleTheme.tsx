import { useTheme } from '../hooks/useTheme'
import { Switch } from '@nextui-org/react';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';

export const ToggleTheme = () => {

    const {isDark, changeTheme} = useTheme();
    
    const handleChangeTheme = (value:boolean) => {
        changeTheme(value);
    }

    return (
        <Switch
            isSelected={isDark}
            size="lg"
            color="warning"
            startContent={<MoonIcon />}
            endContent={<SunIcon />}
            onChange={({ target }) => { handleChangeTheme(target.checked) }}
        >
        </Switch>
    )
}
