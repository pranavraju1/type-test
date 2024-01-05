import React from "react";
import AccountCircle from "./AccountCircle";
import { GiSpeedometer } from "react-icons/gi";
import { useNavigate } from "react-router-dom";



const Header = () => {


  return (
    <div className="header">
      <div className="logo">
      <GiSpeedometer style={{height: '70px', width: '70px', cursor: 'pointer'}} onClick={()=> window.location.reload()} />
      </div>
      <div className="user-icon">
        <AccountCircle />
      </div>
    </div>
  );
};

export default Header;
