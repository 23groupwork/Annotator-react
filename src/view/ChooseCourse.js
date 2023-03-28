import React, { useState } from 'react';
import Navbar from "../component/navbar.js";
import Start from "../component/start.js";
import Alert from "../component/Alert.js";
import { Box, Typography } from '@mui/material';
import { CheckBox } from "../component/checkbox.js";
import { ChooseCard } from "../component/card.js";

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
  const [openAlert, setOpenAlert] = useState(false);

  function handleCheckboxChange(value, checked) {
    setSelectedCheckbox(prevState => ({ 
      ...prevState, 
      [value]: checked 
    }));
  };

  function handleStartClick() {
    if (Object.values(selectedCheckbox).some(checked => checked)) {
      return true;
    } else {
      setOpenAlert(true);
      return false;
    }
  };

  const choiceData = [
    { id: 1, value: 'check1', name: "comp201", intro: "Software Engineering" },
    { id: 2, value: 'check2', name: "comp202", intro: "Algorithm" },
    { id: 3, value: 'check3', name: "comp207", intro: "Database" },
    { id: 4, value: 'check4', name: "comp208", intro: "Software Development" },
  ];

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
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <Start className="learn-more" name="Start your exploration" url="/mainpage" onButtonClick={handleStartClick} />
    </div>
  );
}
