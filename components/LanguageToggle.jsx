'use client';
import { useState } from 'react';
import Image from 'next/image';
import fr from '@/public/france.png';
import en from '@/public/english.png';

const LanguageToggle = () => {
  const [french, setFrench] = useState(true);
  // const toggleTheme = () => {
  //   const newTheme = theme === themes.light ? themes.night : themes.light;
  //   document.documentElement.setAttribute('data-theme', newTheme);
  //   setTheme(newTheme);
  // }
  return (
    <div className="flex mb-4 justify-between w-1/6 gap-2 px-4">
      <Image
        src={en}
        width={48}
        height={48}
        alt="in english"
        priority
        /> 
      <input type="checkbox" className="toggle toggle-sm"
      defaultChecked={french} onChange={() => setFrench(!french)} />
      <Image
        src={fr}
        width={48}
        height={48}
        alt="en français"
        priority
      />  
    </div>
  )
}

export default LanguageToggle;