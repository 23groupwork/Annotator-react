import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom'

function Navigation({isLoggedIn=false}){
    const titleStyle = {
      textDecoration: "none",
      color: "white",
    };

    return(
      <AppBar position="static">
      <Toolbar>  
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/" style={titleStyle}>Annatator</a>
        </Typography>
        <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/" color="inherit">Home</Button>
        <Button  style={{ textTransform: 'none', fontSize: 'large' }} color="inherit">Contact Us</Button>
        <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/register" variant="inherit">Sign Up</Button>
        {/* <Button  style={{ textTransform: 'none', fontSize: 'large' }} component={Link} to="/editor" variant="inherit">+ Release</Button> */}
        <Greeting isLoggedIn={isLoggedIn}/>
      </Toolbar>
    </AppBar>
    );
}

function Greeting({isLoggedIn}){
  return(
    isLoggedIn ? <h3>Welcome back!</h3> : <h3>Sign in, plz</h3>
  );
}

export default Navigation