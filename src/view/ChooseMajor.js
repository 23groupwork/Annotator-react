import Navbar from "../component/navbar.js"
import Start from "../component/start"
import SnackAlert from "../component/Alert.js";
import { CheckBox } from "../component/checkbox.js";
import { ChooseCard } from "../component/card.js";
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

function Choice(props){
    return(
        <div className="choice" data-id={props.id} style={{display: 'flex', flexDirection: 'column',}}>
            <ChooseCard name={props.name} introduction={props.intro}/>
            <CheckBox value={props.value} checked ={props.checked} id={props.id} onChange={props.onChange} mode="single"/>
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

export default function Main({majorData}){
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState('');

    const Location = useLocation();
    // const { id, userName, password } = Location.state;
    const { id = "guest", userName = "guest", password = "guest", roleType = "student" } = Location.state || {};
    const Navigate = useNavigate();

    function handleCheckboxChange(event) {
        const value = event.target.value;
        setSelectedCheckbox(value);
        setSelectedMajor(value);
    };

    //判断用户是否有选择
    function handleStartClick() {
        if (selectedCheckbox === "") {
            setOpenAlert(true);
            return false;
        } else {
            const major = selectedMajor;
            Navigate("/choosecourse", {
                state: { id, userName, password, major, roleType },
            })
            // return true;
        }
    };

    const choiceData = Object.values({majorData})[0];

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
            <div>
            <Start className="learn-more" name="Confirm it!" onButtonClick={handleStartClick}/> 
            </div>
        </div>
    );
}