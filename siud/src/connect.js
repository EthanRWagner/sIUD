import React, {useState} from 'react';
import "./App.css";
import axios from 'axios';
import logo from './logo.png';
import iudBlue from './iud-blue.png';
import backArrow from './backArrow.png';
import {useNavigate} from "react-router-dom";
import DeviceForm from "./deviceForm";

const port = 8675;

function Connect() {

    const navigate = useNavigate();


    const [connect, setConnect] = useState({device: "", status: false});
    
    async function getDeviceName() {
        const device = await axios.post(`http://localhost:${port}/device`, {user: window.sessionStorage.getItem('id')});
        window.sessionStorage.setItem('device', device.data);
    }

    const [popup, setPopup] = useState(false);

    function goToIUD () {
        navigate('../iud');
    }

    function popupConnect() {
        getDeviceName();
        const device = window.sessionStorage.getItem('device');
        if(device.length === 0){
            setPopup(!popup);
        }
        else{
            setConnect({device: device, status: true});
        }
    }

    async function connectIUD(devName) {
        await axios.post(`http://localhost:${port}/setdevice`, {device: devName, user: window.sessionStorage.getItem('id')});
        setConnect({device: devName, status: true});
        window.sessionStorage.setItem('device', devName);
        setPopup(!popup);
        navigate("../connect");
    }

    function disconnectIUD() {
        setConnect({device: "", status: false});
    }

    return (
    <div className="App">
      <div className="device-cont-2">
        <div className='header-bar'>
            <img src={logo} className="App-logo-2" alt="logo" />
        </div>
        <div className='block-div'>
            <button className="back-btn" onClick={goToIUD}>
                <img src={backArrow} className="back-img" alt="backArrow"/>
                &nbsp;BACK
            </button>
            
            <div className='connect-hub'>
                <t className="data-title">DEVICE SETTINGS</t>
                {!connect.status &&
                    <button className='connect-btn' onClick={popupConnect}>CONNECT</button>}

                {connect.status &&
                    <button className='connect-btn' onClick={disconnectIUD}>CONNECT&nbsp;&#x2713;</button>}

                {popup &&
                        <DeviceForm handleClose={popupConnect} handleConnect={connectIUD}/>
        
                }

                <div className='iud-device-div'>
                    <t className='device-subtitle'>DEVICE CONNECTED:</t>
                    <br></br>
                    <br></br>
                    <img src={iudBlue} alt="device"/>
                    <br></br>
                    <br></br>
                    {connect.status &&
                        <t>Device: {window.sessionStorage.getItem('device')}</t>}
                    {!connect.status &&
                        <t>Device: Not Connected</t>}
                    
                </div>
                <div className='stored-data-div'>
                    <t className='device-subtitle' >STORED DATA</t>
                    <div className='data-link-div'>
                        <a href="../positionData" target="_self" name="data-link">POSITION DATA</a>
                        <br></br>
                        <a href="../rotationData" target="_self" name="data-link">ROTATION DATA</a>
                        <br></br>
                        <a href="../tempData" target="_self" name="data-link">TEMPERATURE DATA</a>
                    </div>
                </div>
                
            </div>
        </div>
    
      </div>
    </div>
    );
}

export default Connect;