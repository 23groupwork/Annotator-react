import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../component/navbar.js';
import Start from '../component/start.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Loading from '../component/Loading.js';
import axios from 'axios'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://annotator.top/contact">
        Annotator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>

  );
}

const theme = createTheme();

function SignUp() {
  const [fNameError, setFNameError] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [typeError, setTypeError] = useState(false)
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();

  const buttonStyle = {
    padding: "2em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get('firstName');
    const lastname = data.get('lastName');
    const account = data.get('account');
    const password = data.get('password');
    //判断是否有空值
    if(!firstname){
      setFNameError(true);
    } else {
      setFNameError(false);
    }

    if(!lastname){
      setLNameError(true);
    } else {
      setLNameError(false);
    }

    if (!account) {
      setAccountError(true);
    } else {
      setAccountError(false);
    }

    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!selectedRole) {
      setTypeError(true);
    } else {
      setTypeError(false);
    }

    if (firstname && lastname && account && password && selectedRole) {
      console.log({ firstname, lastname, account, password, selectedRole });
      // 处理成功后，跳转到选择专业页面
      // const roleType = selectedRole;
      // const userName = account;
      // //延迟加载
      // setIsLoading(true);
      // setTimeout(()=>{ 
      //   Navigate("/choosemajor", {
      //     state: {id: Date.now(), userName, password, roleType},
      //   });
      //   setIsLoading(false);
      // }, 3000)

      // //交给后端验证用户输入
      try{
        const response = await axios.post(`http://35.178.198.96:3000/api/users/registerCheck?userName=${account}&password=${password}`);
        //后端响应成功，跳转页面
        if(response.data.message==="Registration successful"){
          // 处理成功后，跳转到选择专业页面
          const roleType = selectedRole;
          const userName = account;
          //延迟加载
          setIsLoading(true);
          setTimeout(()=>{ 
          Navigate("/choosemajor", {
            state: {userName, password, roleType},
          });
          setIsLoading(false);
          }, 3000)
        }
      } catch(error){
        console.error("Error:", error);
        alert(error.response.data.error)
        console.error("Error:", error.response);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <Loading />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={fNameError}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={lNameError}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={accountError}
                  required
                  fullWidth
                  id="account"
                  label="Account"
                  name="account"
                  autoComplete="account"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <br/>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">I am a ...</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}>
                <FormControlLabel value="tutor" control={<Radio />} label="Tutor" />
                <FormControlLabel value="student" control={<Radio />} label="Student" />
              </RadioGroup>
              {typeError && (
            <Typography variant="caption" color="error">
              Please select a role.
            </Typography>
            )}
            </FormControl>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <div style={buttonStyle}>
            <Start className="learn-more" name="sign up" onSubmit={handleSubmit}/>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default function RegisterPage() {
  return(
    <div>
      <Navbar/>
      <SignUp/>
    </div>
  );
}