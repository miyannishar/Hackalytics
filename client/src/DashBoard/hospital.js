import React from 'react';
import './home.css'; // Assuming that the CSS is in home.css in the same folder

import NavBar from './components/navbar';
import RightProfileBar from './components/RightProfileBar';
function Hospital() {
    return (
        <div className="Hospital-Dashboard">
            <NavBar/>


            <div id="main">
                <div id="greeting" className="card">
                    <h2>Your  All Health Reports</h2>
                    <p id="greeting-message">This is the collection of all your health reports from different hospitals.
                    </p>
                </div>

                <div id="cards" className="card">
                    <h2>Reports History</h2>
                    <div className="hospital-card-list">
                        <span id="date" name="date">2022-02-11</span>
                        <span id="hospital-name" name="hospital-name">Civic Hospital</span>
                        <span id="doctor-name" name="doctor-name">Dr. Sajan Poudel</span>
                        <span id="report-view" name="report-view">View Report</span>
                        <span id="call-now" name="call-now">
                            <a class="fixed-tel" href="tel:+8548222xxx" target="_blank" title="Call Now"></a>
                        </span>
                    </div>

              

                  


                    {/* Repeat for other cards */} </div>


                {/* Repeat for other sections */} </div>
            <RightProfileBar/>


        </div>


    );
}

export default Hospital;