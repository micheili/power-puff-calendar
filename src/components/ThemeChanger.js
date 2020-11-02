import React, { useEffect } from 'react';
import themeChanger from '../sass/_themeChanger.scss';



export default function ThemeChanger ({colorTheme, setColorTheme}) {
    const [colorTheme, setColorTheme] = useState('');

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('theme-color');
        if (currentThemeColor) {
            setColorTheme(currentThemeColor);
        }
    }, []);

    const handleClick = (theme) => {
        setColorTheme(theme);
        localStorage.setItem('theme-color', theme);
    }

    return(
    
        <div className='theme-options'>
            <div id='theme-pink'
                onClick={() => handleClick('theme-pink')}
                className={`${colorTheme === 'theme-pink' ? 'active' : ''}`}
            ></div>
            <div id='theme-blue'
                 onClick={() => handleClick('theme-blue')}
                 className={`${colorTheme === 'theme-blue' ? 'active' : ''}`}
            ></div>
            <div id='theme-black'
                 onClick={() => handleClick('theme-black')}
                 className={`${colorTheme === 'theme-black' ? 'active' : ''}`}
            ></div>

        </div>
    );
}