import React, { useState } from 'react'
import Select from 'react-select'
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  const {theme,setTheme} = useTheme();
  const handleChange = (e) =>{
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));//refresh page theme should be same
  }

  const sendEmail = () =>{
    let emailAdress = 'pranavraju2020@gmail.com';
    let mailtoUrl = 'mailto:' + emailAdress;
    window.location.href = mailtoUrl;
    console.log("trying to open");
  }
  return (
    <div className='footer'>
      <div className='links'>
        <IoIosMail style={{height: '30px', width: '30px', marginRight: '15px', cursor: 'pointer'}} onClick={sendEmail} />
        <FaGithub style={{height: '30px', width: '30px', marginRight: '15px', cursor: 'pointer'}} onClick={()=>window.open("https://github.com/pranavraju1/type-test", "_blank")}/>
        <FaLinkedin style={{height: '30px', width: '30px', marginRight: '15px', cursor: 'pointer' }} onClick={()=>window.open("https://www.linkedin.com/in/pranav-raju-6362bb22b/", "_blank")}/>
      </div>
      <div className='themeButton'>
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement='top'
          defaultValue={{label:theme.label,value:theme}}

          // this is how you style a selet component read more icon documentation
          styles={{
            control: styles => ({...styles, backgroundColor: theme.background, cursor: 'pointer'}),
            menu: styles => ({...styles, backgroundColor: theme.background, color: theme.textColor}),
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