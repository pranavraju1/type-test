import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupFrom";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import { signInWithPopup, signInWithRedirect, GoogleAuthProvider} from "firebase/auth";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import { auth } from "../firebaseConfig";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom";


const AccountCircle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0); //this is to set Login and signup
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);//import firebse hook to use this, this will return an array

  const handleMoralOpen = () => {
    if(user){
      // navigate to user page
      navigate('/user');
    }else{
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (event, newValue) => {
    setValue(newValue); //to swith between login and signup
  };

  const logout = () => {
    auth.signOut().then((res) => {
      toast.success('Logged out', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }).catch((error) =>{
      toast.error('not able to logout', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  }


  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth,googleProvider).then((res)=>{
      toast.success('Google login succesful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        handleClose();
    }).catch((err) => {
      toast.error(errorMapping[err.code]||'not able to use Google authentication', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })
  };
  return (
    <div>
      <AccountCircleIcon onClick={handleMoralOpen} style={{height: '70px', width: '70px', marginRight: '50px'}}/>
      {user && <LogoutIcon onClick={logout} style={{height: '70px', width: '70px'}}/>}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "400px", textAlign: "center" }}>
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
              TabIndicatorProps={{ style: { background: theme.textColor } }}
            >
              <Tab label="login" style={{ color: theme.textColor }}></Tab>
              <Tab label="signup" style={{ color: theme.textColor }}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose}/>}
          {value === 1 && <SignupForm handleClose={handleClose}/>}
          <Box>
            <spn>OR</spn>
            <GoogleButton
              style={{
                width: "100%",
                marginTop: "12px",
              }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
      {/* Modal is the page blur effect */}
    </div>
  );
};

export default AccountCircle;
