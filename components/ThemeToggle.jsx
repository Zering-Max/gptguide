'use client';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  fantasy : 'fantasy',
  night: 'night',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.fantasy);
  const toggleTheme = () => {
    const newTheme = theme === themes.fantasy ? themes.night : themes.fantasy;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  }
  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      { theme === 'fantasy' ? <BsMoonFill className="h-4 w-4"/>
      : <BsSunFill className="h-4 w-4" />}
    </button>
  )
}

export default ThemeToggle;