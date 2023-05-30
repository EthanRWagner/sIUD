import React from "react";
import "./App.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs

const TempInfo = props => {

    return (
        <div className="info-popup-box">
        <div className="info-box">
            <span className="info-close-icon" onClick={props.handleClose}>x</span>
            <b>Temperature Analysis Information</b>
            <div>
                <p>
                    The IUD gives approximate data, metrics, and analysis and users
                    should use such information as advice to consult a medical
                    professional if necessary.
                    <br></br>
                    The basal body temperature &lpar;bbt&rpar; can show some general health
                    indications such as hyperthermia, hypothermia, and ovulation phases.
                </p>
                <br></br>
                <t name="critical">
                    A significantly low body temperature is stated to be lower than 35 &deg;C.
                </t>
                <br></br>
                <t name="pre-ov">
                    A pre-ovulation body temperature is stated to be between than 36.0 &deg;C - 36.4 &deg;C.
                </t>
                <br></br>
                <t name="post-ov">
                    A post-ovulation body temperature is stated to be between than 36.4 &deg;C - 37.0 &deg;C.
                </t>
                <br></br>
                <t name="critical">
                    A significantly high body temperature is stated to be greater than 38 &deg;C.
                </t>

            </div>
        </div>
        </div>
    );
};
 
export default TempInfo;