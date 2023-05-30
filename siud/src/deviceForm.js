import React, {useState} from 'react';
import axios from "axios";
import "./App.css";

const port = 8675;

function DeviceForm (props) {

    const [input, setInput] = useState("");

    async function submitDevice() {
        await axios.patch(`http://localhost:${port}/device`, {device: input, user: window.sessionStorage.getItem('id')});
        props.connectIUD(input);
        setInput("");
        props.handleClose();
    }
    
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "device") {
            setInput(value); 
        }
    }
    
    return(
        <form id="device">                            
            <input type='text' name='device' id='device' value={input} onChange={handleChange} className='textfield' placeholder='Enter Device Name/ID...'></input>
            <br></br>
            <button type="submit" value="SAVE" onClick={submitDevice}>Submit</button>
        </form>
    );
}

export default DeviceForm;