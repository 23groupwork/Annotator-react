import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom'

function Navigation(props){
  // const history = useHistory();
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn){
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
        <UserGreeting/>
      </Toolbar>
    </AppBar>
    );
  }
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
        <GuestGreeting/>
      </Toolbar>
    </AppBar>
    );
}

function UserGreeting(props) {
  return <h3>Welcome back!</h3>;
}

function GuestGreeting(props) {
  return <h3>Sign up, plz</h3>;
}

export default Navigation