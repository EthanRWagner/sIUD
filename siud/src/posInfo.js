import React from "react";
import "./App.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs

const PosInfo = props => {

    return (
        <div className="info-popup-box">
        <div className="info-box">
            <span className="info-close-icon" onClick={props.handleClose}>x</span>
            <b>Position Analysis Information</b>
            <div>
                <p>
                    The IUD gives approximate data, metrics, and analysis and users
                    should use such information as advice to consult a medical
                    professional if necessary.
                    <br></br>
                    The Top-Bottom difference measurement will indicates movement
                    in the vertical direction, with reference to the uterus/IUD position.
                    <br></br>
                    The Left-Right difference measurement will indicates movement
                    in the horizontal direction, with reference to the uterus/IUD position.
                </p>
                <br></br>
                <t name="normal">
                    A non-significant indication for position states that the IUD has not
                    moved more than 2mm in the stated direction.
                </t>
                <br></br>
                <t name="mild">
                    A mild indication for position states that the IUD has
                    moved between 2mm - 5mm in the stated direction.
                </t>
                <br></br>
                <t name="critical">
                    A critical indication for position states that the IUD has
                    moved more than 5mm in the stated direction.
                </t>

            </div>
        </div>
        </div>
    );
};
 
export default PosInfo;