import React from "react";
import AccountCircle from "./AccountCircle";
import { FaKeyboard } from "react-icons/fa";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
      <FaKeyboard />
      </div>
      <div className="user-icon">
        <AccountCircle/>
      </div>
    </div>
  );
};

export default Header;
