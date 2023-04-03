import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom'

function Navigation({isLoggedIn=false, name}){
    const titleStyle = {
      textDecoration: "none",
      color: "white",
      fontWeight: "bolder",
    };

    const isGuest = name==="guest";

    return(
      <AppBar position="static">
      <Toolbar>  
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/" style={titleStyle}>Annatator</a>
        </Typography>
        <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/" color="inherit">Home</Button>
        <Button  style={{ textTransform: 'none', fontSize: 'large' }} color="inherit">Contact Us</Button>
        <SignUp isLoggedIn={isLoggedIn} isGuest={isGuest}/>
        {/* <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/register" variant="inherit">Sign Up</Button> */}
        {/* <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/editor" variant="inherit">+ Release</Button> */}
        <Greeting isLoggedIn={isLoggedIn} name={name}/>
      </Toolbar>
    </AppBar>
    );
}

function SignUp({isLoggedIn, isGuest}){
  if(!isLoggedIn || isGuest){
    return(
      <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/register" variant="inherit">Sign Up</Button>
    );
  }
}

function Greeting({isLoggedIn, name}){
  return(
    isLoggedIn ? <h3>{name}, Welcome back!</h3> : <h3>Sign in, plz</h3>
  );
}

export default Navigation