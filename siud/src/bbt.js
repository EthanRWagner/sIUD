import React, {useState} from 'react';
import "./App.css";
import { CChart } from '@coreui/react-chartjs';
import TempInfo from './bbtinfo';

function BodyTemp(props) {

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

    function analyzeBBTData (data_set) {
        const avg_dataBBT = average(data_set);
        if (avg_dataBBT > 36.0 & avg_dataBBT < 36.4)
            return(<t name="pre-ov">Pre-ovulation average temperature observed</t>)
        else if (avg_dataBBT >= 36.4 & avg_dataBBT <= 37.0)
            return(<t name="post-ov">Post-ovulation average temperature observed</t>)
        else if (avg_dataBBT >= 38.0)
            return(<t name="critical">High average body temperature observed</t>)
        else if (avg_dataBBT <= 35.0)
            return(<t name="critical">Low average body temperature observed</t>)
        else
            return(<t name="normal">Normal average body temperature observed</t>)
    }

    return(
        <div className='data-hub'>
            <t className='data-title'>UTERINE TEMP.</t>
            
            <div className='analysis-div'>
                <div className='info-header'>
                    <t className='data-subtitle'>ANALYSIS</t>
                    <button name="info" onClick={toggleInfoPopup}>&#9432;</button>
                </div>
                {analyzeBBTData(props.data.temp.bbt)}
            </div>
            
            <div className='graph-div'>
                <t>*Hover over data points to see the values.</t>
                <br></br>
                <t>Date of Collection:&nbsp;{props.data.time}</t>
                <CChart
                    type="line" 
                    data={{
                        labels: props.data.temp.time,
                        datasets: [
                        {
                            label: "Temperature",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(0, 0, 0, 1)",
                            pointBackgroundColor: "rgba(0, 0, 0, 1)",
                            pointBorderColor: "#000",
                            data: props.data.temp.bbt
                        }
                        ]
                    }}
                    />
            </div>
            {popup &&
                <TempInfo handleClose={toggleInfoPopup}/>}
        </div>
    );
}

export default BodyTemp;