import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";

// src: https://www.cluemediator.com/create-simple-popup-in-reactjs

const RenderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);
  
    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true;
      prevTime.current = currentTime.current;
      currentTime.current = remainingTime;
    } else {
      isNewTimeFirstTick.current = false;
    }
  
    // force one last re-render when the time is over to tirgger the last animation
    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender((val) => val + 1);
      }, 20);
    }
  
    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <div className="time-wrapper">
          <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
            {remainingTime}
          </div>
          {prevTime.current !== null && (
            <div
              key={prevTime.current}
              className={`time ${!isTimeUp ? "down" : ""}`}
            >
              {prevTime.current}
            </div>
          )}
        </div>
      );
    };

const TimerPopup = props => {

    return (
        <div className="timer-popup-box">
        <div className="timer-box">
            <h1 name="record">
                Recording and Retrieving Data...
            </h1>
            <div className="timer-wrapper">
                <CountdownCircleTimer
                isPlaying
                duration={30}
                colors={["#254E70"]}
                >
                {RenderTime}
                </CountdownCircleTimer>
            </div>
        </div>
        </div>
    );
};
 
export default TimerPopup;