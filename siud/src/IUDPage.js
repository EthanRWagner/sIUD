import axios from 'axios';
import React, { useRef, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";
import logo from './logo.png';
import iudBlue from './iud-blue.png';
import bluetoothBlue from './bluetooth-icon-blue.png';
import shareBlue from './share-icon-blue.png';
import eyeBlue from './eye-icon-blue.png';
import ControlledCarousel from './dataScroller';
import {useNavigate} from "react-router-dom";
import Popup from './AccessPopUp';
import SharePopup from './SharePopUp';

const port = 8675;
const delay = ms => new Promise(res => setTimeout(res, ms));

function IUDPage() {

    function randomPos() {
        let randPos = [];
        for (var i=0; i<30; i++){
            randPos.push((Math.random()*20).toFixed(2));
        }
        return randPos;
    }

    function randomBBT() {
        let randBBT = [];
        for (var i=0; i<30; i++){
            randBBT.push(((Math.random()*44)+32).toFixed(2)); 
        }
        return randBBT;
    }

    function randomX() {
        let randX = [];
        for (var i=0; i<30; i++){
            randX.push((Math.random()*15).toFixed(2)); 
        }
        return randX;
    }

    function randomY() {
        let randY = [];
        for (var i=0; i<30; i++){
            randY.push((Math.random()*60).toFixed(2)); 
        }
        return randY;
    }

    function randomZ() {
        let randZ = [];
        for (var i=0; i<30; i++){
            randZ.push((Math.random()*60).toFixed(2)); 
        }
        return randZ;
    }

    //example data
    var posTime = [1, 2, 3, 4, 5, 6, 7, 
        8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30];

    var zeroData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var tempTime = [1, 2, 3, 4, 5, 6, 7, 
        8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30];

    var rotTime = [1, 2, 3, 4, 5, 6, 7, 
        8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30];

    const navigate = useNavigate();

    const [stateAcc, setStateAcc] = useState(false);
    const [stateShare, setStateShare] = useState(false);
    const [stateTimer, setStateTimer] = useState(false);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${month}-${day}-${year}`;
    var time = date.getHours() + ":" + date.getMinutes();
    var dateTime = currentDate+' '+time;

    window.sessionStorage.setItem("connectStatus", true);

    let displayData = JSON.parse(window.sessionStorage.getItem("data"));
    let tempData = {time: "No Data Collected",
                    pos: {
                        time: posTime,
                        tb: zeroData,
                        lr: zeroData},
                    rot: {
                        time: rotTime,
                        x: zeroData,
                        y: zeroData,
                        z: zeroData },
                    temp: {
                        time: tempTime,
                        bbt: zeroData
                    }};

    if(displayData === null){
        displayData = tempData;
    }

    async function getData () {
        try{
            const result = await axios.post(`http://localhost:${port}/getData`, {user: window.sessionStorage.getItem('id')});
            window.sessionStorage.setItem("data", JSON.stringify(result.data));
            return result.data;
        }
        catch (error) {
            return error;
        }
    }

    async function sendData () {
        let formattedData = {time: dateTime,
                            pos: {
                                time: posTime,
                                tb: randomPos(),
                                lr: randomPos()},
                            rot: {
                                time: rotTime,
                                x: randomX(),
                                y: randomY(),
                                z: randomZ() },
                            temp: {
                                time: tempTime,
                                bbt: randomBBT()
                            }};
        try{
            const result = await axios.post(`http://localhost:${port}/postData`, {data: formattedData, user: window.sessionStorage.getItem('id')});
            return result;
        }
        catch (error) {
            return error;
        }
    }
    
    function handleClickConnect(){
        navigate('../connect');
    }

    function goToLogin() {
        window.sessionStorage.clear();
        navigate('../login');
    }

    const toggleAccessPopup = () => {
        setStateAcc(!stateAcc);
    }

    const toggleSharePopup = () => {
        setStateShare(!stateShare);
    }
    
    const toggleTimerPopup = () => {
        setStateTimer(!stateTimer);
    }

    async function handleClickCollect() {
        try{
            // send data to user profile
            toggleTimerPopup();
            sendData();
            // delay 30 seconds
            await delay(5000);
            // get data
            displayData = getData();
            window.location.replace(window.location.href);
        }
        catch (error) {
            return error;
        }
    }

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

    return (
    <div className="App">
      <div className="device-cont-2">
        <div className='header-bar'>
            <img src={logo} className="App-logo-2" alt="logo" />
        </div>

        <div className='footer-bar'>
            <div className='button-div'>
                <button className='iud-button' id='iudButton' onClick={handleClickCollect}>
                    <img src={iudBlue} className="iud-blue-img" alt="iudBlue" />
                </button>
                <button className='iud-button' id='iudButton' onClick={handleClickConnect}>
                    <img src={bluetoothBlue} className="bluetooth-blue-img" alt="bluetoothBlue" />
                </button>
                <button className='iud-button' id='iudButton' onClick={() => toggleSharePopup()}>
                    <img src={shareBlue} className="share-blue-img" alt="shareBlue" />
                </button>
                <button className='iud-button' id='iudButton' onClick={() => toggleAccessPopup()}>
                    <img src={eyeBlue} className="eye-blue-img" alt="eyeBlue" />
                </button>
            </div>
        </div>
        {stateAcc && <Popup
                handleClose={toggleAccessPopup}
                />}
        {stateShare && <SharePopup
                handleClose={toggleSharePopup}
                />}
        <div className='iud-content-div'>
            <button className="back-btn" onClick={goToLogin}>LOGOUT</button>
            <div className='gallery-div'>
                <ControlledCarousel data={displayData}/>
            </div>
            {stateTimer && 
                <div className="timer-popup-box">
                <div className="timer-box">
                    <h1 name="record">
                        Recording and Retrieving Data...
                    </h1>
                    <div className="timer-wrapper">
                        <CountdownCircleTimer
                        isPlaying
                        duration={5}
                        colors={["#254E70"]}
                        >
                        {RenderTime}
                        </CountdownCircleTimer>
                    </div>
                </div>
                </div>}
        </div>
      </div>
    </div>
    );
}

export default IUDPage