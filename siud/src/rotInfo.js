import React from "react";
import "./App.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs

const RotInfo = props => {

    return (
        <div className="info-popup-box">
        <div className="info-box">
            <span className="info-close-icon" onClick={props.handleClose}>x</span>
            <b>Rotation Analysis Information</b>
            <div>
                <p>
                    The IUD gives approximate data, metrics, and analysis and users
                    should use such information as advice to consult a medical
                    professional if necessary.
                    <br></br>
                    The X-axis rotation measurement will indicates rotation, if a person is standing up, 
                    about an axis in the direction across the shoulders.
                    <br></br>
                    The Y-axis rotation measurement will indicates rotation, if a person is standing up, 
                    about an axis in the direction looking forward.
                    <br></br>
                    The Z-axis rotation measurement will indicates rotation, if a person is standing up, 
                    about an axis in the direction coming out of the head.
                </p>
                <br></br>
                <t name="normal">
                    A non-significant indication for rotation states that the IUD has not
                    rotated more than 5&deg; in the stated direction. For the x-axis, the
                    limit is less than 2&deg;.
                </t>
                <br></br>
                <t name="mild">
                    A mild indication for rotation states that the IUD has
                    moved between 5&deg; - 20&deg; in the stated direction.
                    For the x-axis, the limit is between 2&deg; - 20&deg;.
                </t>
                <br></br>
                <t name="critical">
                    A critical indication for position states that the IUD has
                    moved more than 20&deg; in the stated direction. For the x-axis, the
                    limit is more than 5&deg;.
                </t>

            </div>
        </div>
        </div>
    );
};
 
export default RotInfo;