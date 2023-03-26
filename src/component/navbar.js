import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom'

function Navigation({isLoggedIn=false}){
    return(
      <AppBar position="static">
      <Toolbar>  
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Annatator
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button color="inherit">Contact us</Button>
        <Button component={Link} to="/login" color="inherit">Sign in</Button>
        <Button component={Link} to="/register" variant="oiutlined">Sign up</Button>
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