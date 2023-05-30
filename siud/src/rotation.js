import React, {useState} from 'react';
import "./App.css";
import { CChart } from '@coreui/react-chartjs';
import RotInfo from './rotInfo';

function Rotation(props) {

    const [popup, setPopup] = useState(false);

    function toggleInfoPopup () {
        setPopup(!popup);
    }

    function average(array) {
        var sum = 0;
        array.forEach((element) => {
            sum += element;
        });
        return sum / array.length;
    }

    // Standing up, x-axis horizontal through person, y-axis coincident to person, z-axis parallel to person
    // Positive indicates using right hand rule along axis indicated
    function analyzeRotData (data_set, dir) {
        if (dir === 'Y') {
            const avg_dataY = average(data_set);
            if (avg_dataY > 5 & avg_dataY < 20)
                return(<t name="mild">IUD has mild positive rotations about the y-axis</t>)
            else if (avg_dataY < -5 & avg_dataY > -20)
                return(<t name="mild">IUD has mild negative rotations about the y-axis</t>)
            else if (avg_dataY >= 20)
                return(<t name="critical">IUD has critical positive rotations about the y-axis</t>)
            else if (avg_dataY <= -20)
                return(<t name="critical">IUD has critical negative rotations about the y-axis</t>)
            else
                return(<t name="normal">IUD has no significant rotations about the y-axis</t>)
        }

        else if (dir === 'Z') {
            const avg_dataZ = average(data_set);
            if (avg_dataZ > 5 & avg_dataZ < 20)
                return(<t name="mild">IUD has mild positive rotations about the z-axis</t>)
            else if (avg_dataZ < -5 & avg_dataZ > -20)
                return(<t name="mild">IUD has mild negative rotations about the z-axis</t>)
            else if (avg_dataZ > 20)
                return(<t name="critical">IUD has critical positive rotations about the z-axis</t>)
            else if (avg_dataZ< -20)
                return(<t name="critical">IUD has critical negative rotations about the z-axis</t>)
            else
                return(<t name="normal">IUD has no significant rotations about the z-axis</t>)
        
        }
 
        else if (dir === 'X') {
            const avg_dataX = average(data_set);
            if (avg_dataX > 2 & avg_dataX <=5)
                return(<t name="mild">IUD has mild positive rotations about the x-axis</t>)
            else if (avg_dataX < -2 & avg_dataX >=-5)
                return(<t name="mild">IUD has mild negative rotations about the x-axis</t>)
            else if (avg_dataX > 5)
                return(<t name="critical">IUD has critical positive rotations about the x-axis</t>)
            else if (avg_dataX < -5)
                return(<t name="critical">IUD has critical negative rotations about the x-axis</t>)
            else
                return(<t name="normal">IUD has no significant rotations about the x-axis</t>)
        }

        else
            return(<t>Parameter Error</t>)

    }

    return(
        <div className='data-hub'>
            <t className='data-title'>IUD ROTATION</t>
            <div className='analysis-div'>
                <div className='info-header'>
                    <t className='data-subtitle'>ANALYSIS</t>
                    <button name="info" onClick={toggleInfoPopup}>&#9432;</button>
                </div>
                {analyzeRotData(props.data.rot.x, 'X')}
                <br></br>
                {analyzeRotData(props.data.rot.y, 'Y')}
                <br></br>
                {analyzeRotData(props.data.rot.z, 'Z')}
            </div>
            
            <div className='graph-div'>
                <t>*Hover over data points to see the values.</t>
                <br></br>
                <t>Date of Collection:&nbsp;{props.data.time}</t>
                <CChart
                    type="line" 
                    data={{
                        labels: props.data.rot.time,
                        datasets: [
                        {
                            label: "X-rotation",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(0, 0, 0, 1)",
                            pointBackgroundColor: "rgba(0, 0, 0, 1)",
                            pointBorderColor: "#000",
                            data: props.data.rot.x
                        },
                        {
                            label: "Y-rotation",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(166, 216, 212, 1)",
                            pointBackgroundColor: "rgba(166, 216, 212, 1)",
                            pointBorderColor: "#000",
                            data: props.data.rot.y
                        },
                        {
                            label: "Z-rotation",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(66, 3, 61, 1)",
                            pointBackgroundColor: "rgba(66, 3, 61, 1)",
                            pointBorderColor: "#000",
                            data: props.data.rot.z
                        }
                        ],
                    }}
                    />
            </div>
            {popup &&
                <RotInfo handleClose={toggleInfoPopup}/>}
        </div>
    );
}

export default Rotation;