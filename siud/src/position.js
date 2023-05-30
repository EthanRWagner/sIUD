import React, {useState} from 'react';
import "./App.css";
import { CChart } from '@coreui/react-chartjs';
import PosInfo from './posInfo';

function Position(props) {

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

    function analyzePosData (data_set, dir) {
        if (dir === 'LR') {
            const avg_dataLR = average(data_set);
            if (avg_dataLR > 2 & avg_dataLR <= 5)
                return(<t name="mild">IUD has a mild asymmetry to the right</t>)
            else if (avg_dataLR < -2 & avg_dataLR >= -5)
                return(<t name="mild">IUD has a mild asymmetry to the left</t>)
            else if (avg_dataLR > 5)
                return(<t name="critical">IUD has a critical asymmetry to the right</t>)
            else if (avg_dataLR< -5)
                return(<t name="critical">IUD has a critical asymmetry to the left</t>)
            else
                return(<t name="normal">IUD has no significant asymmetries in the horizontal direction</t>)
        }

        else if (dir === 'TB') {
            const avg_dataTB = average(data_set);
            if (avg_dataTB > 2 & avg_dataTB <= 5)
                return(<t name="mild">IUD has a mild asymmetry to the bottom</t>)
            else if (avg_dataTB < -2 & avg_dataTB >= -5)
                return(<t name="mild">IUD has a mild asymmetry to the top</t>)
            else if (avg_dataTB > 5)
                return(<t name="critical">IUD has a critical asymmetry to the bottom</t>)
            else if (avg_dataTB< -5)
                return(<t name="critical">IUD has a critical asymmetry to the top</t>)
            else
                return(<t name="normal">IUD has no significant asymmetries in the vertical direction</t>)
        }

        else
            return(<t>Parameter Error</t>)

    }

    return(
        <div className='data-hub'>
            <t className='data-title'>IUD POSITION</t>
            
            <div className='analysis-div'>
                <div className='info-header'>
                    <t className='data-subtitle'>ANALYSIS</t>
                    <button name='info' onClick={toggleInfoPopup}>&#9432;</button>
                </div>
                {analyzePosData(props.data.pos.tb, 'TB')}
                <br></br>
                {analyzePosData(props.data.pos.lr, 'LR')}
            </div>
            <div className='graph-div'>
                <t>*Hover over data points to see the values.</t>
                <br></br>
                <t>Date of Collection:&nbsp;{props.data.time}</t>
                <CChart
                    type="line" 
                    data={{
                        labels: props.data.pos.time,
                        datasets: [
                        {
                            label: "Top-Bottom Difference",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(191, 65, 88, 1)",
                            pointBackgroundColor: "rgba(191, 65, 88, 1)",
                            pointBorderColor: "#000",
                            data: props.data.pos.tb
                        },
                        {
                            label: "Left-Right Difference",
                            backgroundColor: "rgba(220, 220, 220, 0.2)",
                            borderColor: "rgba(42, 8, 0, 1)",
                            pointBackgroundColor: "rgba(42, 8, 0, 1)",
                            pointBorderColor: "#000",
                            data: props.data.pos.lr
                        }
                        ],
                    }}
                    />
            </div>
            {popup &&
                <PosInfo handleClose={toggleInfoPopup}/>}
        </div>
    );
}

export default Position;