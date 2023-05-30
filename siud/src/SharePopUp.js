import React from "react";
import "./App.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs

const SharePopup = props => {
    
    const submitForm = async (event) => {
        const form = document.querySelector("form");
        const data = new FormData(form);
        let output = ["", "", "", "", ""];
        var i = 0;
        for (const entry of data) {
            output[i] = entry[1];
            i = i+1;
        }
        if (output[0].length !== 0 && output[1].length !== 0 && (output[2].length !== 0 || output[3].length !== 0 || output[4].length !== 0)){
            let dataSent = [];
            if(output[2].length > 0){
                dataSent.push(output[2]);
            }
            if(output[3].length > 0){
                dataSent.push(output[3]);
            }
            if(output[4].length > 0){
                dataSent.push(output[4]);
            }
            alert("Message Summary: \nSender: " + output[0] + "\nRecipient: " + output[1] + "\nData Sent:\n" + dataSent);
        }
        else
            alert("Message Error: One or more fields are not filled out.");
        props.handleClose();
    }

    return (
        <div className="popup-box">
        <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <form id="colorPref">
                <b>Share Data</b>

                <div>
                    <input type="text" name="recipient" id="recipient" placeholder="Recipient Email..."></input>
                    <br></br>
                    <input type="text" name="sender" id="sender" placeholder="Sender Email..."></input>
                </div>
                
                <div className="check-box-share">
                    <div className="check-box-opt">
                        <input type="checkbox" id="pos" name="pos" value="Position" />&nbsp;POSITION
                    </div>
                    <span className="check-box-opt">
                        <input type="checkbox" id="rot" name="rot" value="Rotation" />&nbsp;ROTATION
                    </span>
                    <span className="check-box-opt">
                        <input type="checkbox" id="temp" name="temp" value="Temperature" />&nbsp;TEMPERATURE
                    </span>
                </div>
                <button type="submit" value="SAVE" onClick={() => submitForm()}>SEND</button>
            </form>
        </div>
        </div>
    );
};
 
export default SharePopup;