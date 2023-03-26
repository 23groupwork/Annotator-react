import Navbar from "../component/navbar.js"
import Start from "../component/start"
import SnackAlert from "../component/Alert.js";
import { CheckBox } from "../component/checkbox.js";
import { ChooseCard } from "../component/card.js";
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

function Choice(props){
    return(
        <div className="choice" data-id={props.id} style={{display: 'flex', flexDirection: 'column',}}>
            <ChooseCard name={props.name} introduction={props.intro}/>
            <CheckBox value={props.value} checked={props.checked} id={props.id} onChange={props.onChange} mode="single"/>
        </div>
    );
}

function AskMajor(){
    return(
        <Box sx={{ backgroundColor: '#f0f0f0', padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          What's your major?
        </Typography>
      </Box>

    );
}

export default function Main(){
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    function handleCheckboxChange(value) {
        setSelectedCheckbox(value);
    };

    //判断用户是否有选择
    function handleStartClick() {
        if (selectedCheckbox === "") {
            setOpenAlert(true);
            return false;
        } else {
            return true;
        }
    };

    const choiceData = [
        { id: 1, value: 'check1', name: "Computer Science", intro: "Don't come, run!" },
        { id: 2, value: 'check2', name: "A major", intro: "Welcome!" },
        { id: 3, value: 'check3', name: "A major", intro: "Welcome!" },
        { id: 4, value: 'check4', name: "A major", intro: "Welcome!" },
        { id: 5, value: 'check5', name: "A major", intro: "Welcome!" },
    ];

    return(
        <div>
            <Navbar/>
            <AskMajor/>
            <SnackAlert name="major" open={openAlert}/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            {choiceData.map((choice) => (
                    <Choice
                        key={choice.id}
                        name={choice.name}
                        value={choice.value}
                        intro={choice.intro}
                        checked={selectedCheckbox === choice.value} 
                        onChange={handleCheckboxChange}
                    />
                ))}
            </div>
            <Start className="learn-more" name="Confirm it!" url="/choosecourse" onButtonClick={handleStartClick}/> 
        </div>
    );
}