import React, { useState } from 'react';
import Navbar from "../component/navbar.js";
import Start from "../component/start.js";
import Alert from "../component/Alert.js";
import { Box, Typography } from '@mui/material';
import { CheckBox } from "../component/checkbox.js";
import { ChooseCard } from "../component/card.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { addUser } from "../data/data";
import  ChoiceData from "../data/coursedata.js"

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
      <Typography variant="h5" gutterBottom>
        What you are interested in?
      </Typography>
    </Box>
  );
}

export default function Main() {
  const [selectedCheckbox, setSelectedCheckbox] = useState({});
  const [selectedCourse, setSelectedCourse] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const location = useLocation();
  const Navigate = useNavigate();
  const { id, userName, password, major } = location.state;

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

  function handleStartClick() {
    if (Object.values(selectedCheckbox).some(checked => checked)) {
      const courses = selectedCourse;
      console.log(courses)
      //更换首字母avatar
      let newUser;
      if(id==="guest"){
        newUser = {
          id,
          userName,
          password,
          major,
          courses,
          avatar: 'G',
        }
      } else {
        const first = userName.charAt(0);
        newUser = {
          id,
          userName,
          password,
          major,
          courses,
          avatar: {first},
        }
      }
      
      addUser(newUser);
      Navigate("/mainpage", {
        state: {newUser},
      });
      // return true;
    } else {
      setOpenAlert(true);
      return false;
    }
  };

  let choiceData;
  if(major==="Computer Science"){
    choiceData = ChoiceData[0];
  } else if(major==="Economics"){
    choiceData = ChoiceData[1];
  } else if(major==="Mathematic"){
    choiceData = ChoiceData[3];
  } else if(major==="Law"){
    choiceData = ChoiceData[2];
  }

  return (
    <div>
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
      <Start className="learn-more" name="Start your exploration" onButtonClick={handleStartClick} />
    </div>
  );
}
