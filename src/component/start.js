import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../layouts/start.css"

function QuickStart(props){
    const Navigate = useNavigate();

    function handelClick(){
        let shouldNavigate = true;

        if (props.onButtonClick) {
            shouldNavigate = props.onButtonClick();
        }
        if (shouldNavigate) {
            Navigate(props.url);
        }
    }

    return(
        <div className='buttonContainer'>
            <button className={props.className} onClick={handelClick} url={props.url}>{props.name}</button>
        </div>
    );
}

export default QuickStart;