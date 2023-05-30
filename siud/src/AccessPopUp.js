import React from "react";
import axios from 'axios';
import "./App.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs
const port = 8675;

const Popup = props => {

    // gets the user information from Feed componenet
    const user = window.sessionStorage.getItem('id');

    const submitForm = async (event) => {
        const form = document.querySelector("form");
        const data = new FormData(form);
        let output = 0;
        for (const entry of data) {
            output = entry[1];
        }
        try {
            if(output !== 0){
                await axios.patch(`http://localhost:${port}/access`, {id: user, pref: output});
                alert("Color Preferences Changed To: \n" + output);
                props.handleClose();
            }
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    return (
        <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <form id="colorPref">
                <b>Color Blindness Accessibility Options</b>
                
                <div className="check-box">
                    <div className="check-box-opt">
                        <input type="radio" id="default" name="colorPref" value={1} />&nbsp;DEFAULT
                        &nbsp;&nbsp;<div className="square def-prim"></div>
                        &nbsp;<div className="square def-sec"></div>
                    </div>
                    <span className="check-box-opt">
                        <input type="radio" id="prota" name="colorPref" value={2} />&nbsp;PROTA-
                    </span>
                    <span className="check-box-opt">
                        <input type="radio" id="deutera" name="colorPref" value={3} />&nbsp;DEUTERA-
                    </span>
                    <span className="check-box-opt">
                        <input type="radio" id="trita" name="colorPref" value={4} />&nbsp;TRITA-
                    </span>
                    <span className="check-box-opt">
                        <input type="radio" id="by" name="colorPref" value={5} />&nbsp;BLUE-YELLOW
                    </span>
                    <span className="check-box-opt">
                        <input type="radio" id="mono" name="colorPref" value={6} />&nbsp;MONO
                    </span>
                </div>
                <button type="submit" value="SAVE" onClick={() => submitForm()}>SAVE</button>
            </form>
        </div>
        </div>
    );
};
 
export default Popup;