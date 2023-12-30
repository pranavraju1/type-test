import React, { useState } from 'react'
import Select from 'react-select'
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';

const Footer = () => {
  const {theme,setTheme} = useTheme();
  const handleChange = (e) =>{
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));//refresh page theme should be same
  }
  return (
    <div className='footer'>
      <div className='links'>
        Links
      </div>
      <div className='themeButton'>
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement='top'
          defaultValue={{label:theme.label,value:theme}}

          // this is how you style a selet component read more ion documentation
          styles={{
            control: styles => ({...styles, backgroundColor: theme.background}),
            menu: styles => ({...styles, backgroundColor: theme.background}),
            option: (styles,{isFocused}) => {
              return{
                ...styles,
                backgroundColor: (!isFocused)? theme.background : theme.textColor,
                color:(!isFocused)? theme.textColor : theme.background,
                cursor: 'pointer'
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default Footer