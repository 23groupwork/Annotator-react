import "../layouts/checkbox.css"
import { useState } from 'react';

export function CheckBox(props){
    const [isChecked, setIsChecked] = useState(props.checked);
    const handleChange = (event) => {
        const value = event.target.value;
        if(props.mode==="single"){
            props.onChange(event);
        } else if(props.mode==="multiple"){
            const { checked } = event.target;
            props.onChange(props.value, checked);
        } else {
            props.onChange(value);
            setIsChecked(!isChecked);
        }
    };

    return(
        <label className="container">
            <input type='checkbox' value={props.value} checked={props.checked} onChange={handleChange} />
            <div className="checkmark"></div>
        </label>
    );
}