import React, { useState } from 'react';
import Navbar from "../component/navbar.js";
import Start from "../component/start.js";
import Alert from "../component/Alert.js";
import { Box, Typography } from '@mui/material';
import { CheckBox } from "../component/checkbox.js";
import { ChooseCard } from "../component/card.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loading from '../component/Loading.js';
import axios from 'axios';
import { useEffect } from 'react';

function Choice(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', }}>
      <ChooseCard name={props.name} introduction={props.intro} />
      <CheckBox value={props.value} checked={props.checked} onChange={props.onChange} mode="multiple"/>
    </div>
  );
}

function AskCourse() {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', padding: 2 }}>
      <Typography variant="h5" gutterBottom style={{textAlign:"center"}}>
        What you are interested in?
      </Typography>
    </Box>
  );
}

export default function Main() {
  const [selectedCheckbox, setSelectedCheckbox] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [choiceData, setChoiceData] = useState([])
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [roleType, setRoleType] = useState("");
  const Location = useLocation();
  const Navigate = useNavigate();
  
  useEffect(() => {
    if(Location.state){
      setUserName(Location.state.userName);
      setPassword(Location.state.password);
      setMajor(Location.state.major);
      setRoleType(Location.state.roleType);
    }
  }, [Location.state])

  console.log({userName, password, major, roleType})

  const fetchCourses = async () => {
    try {
      const response = await axios.post(`http://35.178.198.96:3000/api/users/course?major=${major}`);
      console.log(response.data.courses);
      setChoiceData(response.data.courses);
      console.log(choiceData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [major]);

  useEffect(() => {
    console.log(choiceData);
  }, [choiceData]);

  function handleCheckboxChange(value, checked, name, id) {
    setSelectedCheckbox(prevState => ({
      ...prevState,
      [value]: checked
    }));
  
    if (checked) {
      setSelectedCourse(prevState => ({
        ...prevState,
        [id]: name,
      }));
    } else {
      setSelectedCourse(prevState => {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      });
    }
  }  

 async function handleStartClick() {
    if (Object.values(selectedCheckbox).some(checked => checked)) {
      const courses = selectedCourse;
      console.log(courses)
      //更换首字母avatar
      let newUser;
      let sendUser;
      if(userName==="guest"){
        const avatar = 'G'
        sendUser = {
          userName,
          password,
          major,
          courses,
          avatar,
          roleType,
        }
      } else {
        const avatar = userName.charAt(0);
        const course_name = Object.values(courses);
        console.log(courses);
        newUser = {
          userName,
          password,
          major,
          avatar,
          roleType,
          course_name,
        }
        sendUser = {
          userName,
          major,
          avatar,
          roleType,
          courses,
        }
        console.log(newUser)
      }
      // addUser(newUser);
      // setIsLoading(true);
      // setTimeout(()=>{
      //   Navigate("/mainpage", {
      //     state: sendUser,
      //   });
      //   setIsLoading(false);
      // }, 2000)
      // return true;

      //用户数据发送给后端，存入数据库
      if(userName!=="guest"){
        try{
          const response = await axios.post("http://35.178.198.96:3000/api/users/registerStore", newUser);
          console.log(response)
          console.log(newUser);
          if(response.data.message==="Data has been successfully written"){
            setIsLoading(true);
            setTimeout(()=>{
            Navigate("/mainpage", {
              state: sendUser
            });
            setIsLoading(false);
            }, 2000)
          }
        } catch(error){
          console.error("Error:", error);
        }
      } else {
        setIsLoading(true);
        setTimeout(()=>{
        Navigate("/mainpage", {
          state: sendUser,
         });
         setIsLoading(false);
       }, 2000)
      }
    } else {
      setOpenAlert(true);
      return false;
    }
  };

  // let choiceData;
  // if(major==="Computer Science"){
  //   choiceData = ChoiceData[0];
  // } else if(major==="Economics"){
  //   choiceData = ChoiceData[1];
  // } else if(major==="Mathematic"){
  //   choiceData = ChoiceData[3];
  // } else if(major==="Law"){
  //   choiceData = ChoiceData[2];
  // }

  console.log(choiceData)
  return (
    <div>
      {isLoading && <Loading/>}
      <Navbar />
      <AskCourse />
      <Alert name="courses" open={openAlert} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {choiceData.map((choice) => (
          <Choice
            key={choice.id}
            name={choice.name}
            value={choice.value}
            intro={choice.intro}
            checked={selectedCheckbox[choice.value] || false}
            onChange={(value, checked) => handleCheckboxChange(value, checked, choice.name, choice.id)}
          />
        ))}
      </div>
      <div style={{margin:"4em"}}>
        <Start className="learn-more" name="Start your exploration" onButtonClick={handleStartClick} />
      </div>
    </div>
  );
}
