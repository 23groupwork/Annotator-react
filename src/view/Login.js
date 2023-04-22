import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Start from "../component/start.js"
import {CurrentUser} from "../data/data.js"
import Loading from '../component/Loading.js';
import axios from 'axios'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://annotator.top/contact">
        Annatotor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignIn() {
  const Navigate = useNavigate();
  const [accountError, setAccountError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    const account = data.get('account');
    const password = data.get('password');
    //判断输入框是否为空
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
    if (account && password) {
      //接收后端响应数据
      try{
        const response = await axios.post(`http://35.178.198.96:3000/api/users/login?userName=${account}&password=${password}`);
        //拿到后端数据进行处理
        console.log(response)
        if(response.data.message!=="Login successful"){
          console.error("not successful");
        } else {
          const testusers = response.data.users;
          console.log(testusers[0].user_name);
          let finaluser = {userName: testusers[0].user_name, major: testusers[0].major, avatar: testusers[0].avatar, roleType: testusers[0].roleType};
          let courses = {};
          for (const [index, testuser] of testusers.entries()) {
          courses[`${index+1}`] = testuser.course_name;
          }
          finaluser.courses = courses;
          console.log(finaluser);
          // 处理成功后，跳转到用户对应的主页面
          if(finaluser){
          //设置延迟加载动画
          setIsLoading(true);
          setTimeout(()=>{
          Navigate("/mainpage", {
            state: finaluser,
          });
          setIsLoading(false);
        }, 3000)
      } else {
        setAccountError(!finaluser);
        setPasswordError(!finaluser);
        // alert("Invalid username and password");
      }
        }
      }catch (error) {
        alert("try again", error.response.message);
        console.error("Error:", error);
        console.error("Error response:", error.response);
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
        console.error("Error message", error.response.message);
        // 处理请求错误
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={accountError}
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoFocus
            />
            <TextField
              error={passwordError}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div style={buttonStyle}>
            <Start className="learn-more" name="Sign In" onSubmit={handleSubmit}/>
            <Start className="learn-more" name="Quick Start" url="/choosemajor"/>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default function LoginPage() {
  return(
    <div>
      <SignIn/>
    </div>
  );
}