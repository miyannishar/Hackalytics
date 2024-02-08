import React from "react";
import "./home.css"; // Assuming that the CSS is in home.css in the same folder
import Step from "./images/step.png";
import CaloriesBurn from "./images/caloriesburn.png";
import Pressure from "./images/pressure.png";
import Graph from "./images/graphc.png";
import NavBar from "./components/navbar";
import RightProfileBar from "./components/RightProfileBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Dashboard() {
  const [data, setData] = useState(null);
  const [token, setToken] = useState("");
  const [stepCountLastEntry, setstepCountLastEntry] = useState(0);
  const [calories, setCalories] = useState(0);
  const [bloodPressure, setBloodPressure] = useState([]);
  const username = localStorage.getItem("username");
  const [caloriesData, setCaloriesData] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [sleepDurationData, setSleepDurationData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);

  // Inline CSS keyframes animation
  const glowAnimation = `
    @keyframes glow {
      0% {
        border-color: rgba(0, 191, 255, 0.8); /* Base color */
      }
      50% {
        border-color: rgba(0, 191, 255, 1); /* Bright glowing color */
      }
      100% {
        border-color: rgba(0, 191, 255, 0.8); /* Back to base color */
      }
    }
  `;

  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const fetchData = async () => {
      try {
        // Make GET request to backend API
        const response = await axios.get(
          "http://localhost:5000/api/v1/get/getdata",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`, // Use stored token directly
            },
          }
        );

        // Set data state with the response data
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  useEffect(() => {
    if (data) {
      const jsonArrayParsed = JSON.parse(JSON.stringify(data));

      console.log(jsonArrayParsed);

      // Access the last entry in the array
      const lastEntry = jsonArrayParsed[jsonArrayParsed.length - 1];

      // Extract the stepCount property from the last entry
      setstepCountLastEntry(lastEntry.activity.stepCount);
      setCalories(lastEntry.activity.caloriesBurned);
      setBloodPressure([
        lastEntry.biometric.bloodPressure.systolic,
        lastEntry.biometric.bloodPressure.diastolic,
      ]);

      //   console.log(stepCountLastEntry); // Output: 9194
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const calories = data.map((entry) => entry.activity.caloriesBurned);
      setCaloriesData(calories);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const heartRateData = data.map((entry) => entry.biometric.heartRate);
      const sleepDurationData = data.map((entry) => entry.sleep.duration);
      const bloodPressureData = data.map(
        (entry) =>
          `${entry.biometric.bloodPressure.systolic}/${entry.biometric.bloodPressure.diastolic}`
      );

      // Set state for heart rate, sleep duration, and blood pressure data
      setHeartRateData(heartRateData);
      setSleepDurationData(sleepDurationData);
      setBloodPressureData(bloodPressureData);
    }
  }, [data]);

  useEffect(() => {
    if (caloriesData.length > 0) {
      const ctx = document.getElementById("caloriesChart");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: caloriesData.map((_, index) => `Entry ${index + 1}`),
          datasets: [
            {
              label: "Calories Burned",
              data: caloriesData,
              borderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color
              backgroundColor: "rgba(0, 191, 255, 0.2)", // Light sky blue background
              tension: 0.4,
              borderWidth: 2,
              pointBackgroundColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
              pointBorderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Calories Burned Over Time",
              color: "rgba(0, 191, 255, 0.8)", // Sky blue color for title
              font: {
                size: 18,
              },
            },
            legend: {
              display: true,
              labels: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for legend
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
              },
              ticks: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                font: {
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
              },
              ticks: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                font: {
                  size: 12,
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [caloriesData]);

  useEffect(() => {
    if (heartRateData.length > 0) {
      const ctx = document.getElementById("heartRateChart");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: heartRateData.map((_, index) => `Entry ${index + 1}`),
          datasets: [
            {
              label: "Calories Burned",
              data: heartRateData,
              borderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color
              backgroundColor: "rgba(0, 191, 255, 0.2)", // Light sky blue background
              tension: 0.4,
              borderWidth: 2,
              pointBackgroundColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
              pointBorderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Calories Burned Over Time",
              color: "rgba(0, 191, 255, 0.8)", // Sky blue color for title
              font: {
                size: 18,
              },
            },
            legend: {
              display: true,
              labels: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for legend
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
              },
              ticks: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                font: {
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
              },
              ticks: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                font: {
                  size: 12,
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [heartRateData]);

  useEffect(() => {
    if (sleepDurationData.length > 0) {
      const ctx = document.getElementById("sleepDurationChart");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: sleepDurationData.map((_, index) => `Entry ${index + 1}`),
          datasets: [
            {
              label: "Calories Burned",
              data: sleepDurationData,
              borderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color
              backgroundColor: "rgba(0, 191, 255, 0.2)", // Light sky blue background
              tension: 0.4,
              borderWidth: 2,
              pointBackgroundColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
              pointBorderColor: "rgba(0, 191, 255, 0.8)", // Sky blue color for data points
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Calories Burned Over Time",
              color: "rgba(0, 191, 255, 0.8)", // Sky blue color for title
              font: {
                size: 18,
              },
            },
            legend: {
              display: true,
              labels: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for legend
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
              },
              ticks: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                font: {
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: "rgba(0, 191, 255, 0.2)", // Light sky blue color for grid lines
              },
              ticks: {
                color: "rgba(0, 191, 255, 0.8)", // Sky blue color for axis labels
                font: {
                  size: 12,
                },
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [sleepDurationData]);

  //   console.log(data)

  return (
    <div className="Health-Dashboard">
      <NavBar />

      <div id="main">
        <div id="greeting" className="card">
          <h2>Your Health Analysis</h2>
          <p id="greeting-message">
            This is your detailed health based on your personal health data.
            This is predicted by AI.
          </p>
        </div>
        <div id="cards" className="card">
          <h2>Cards</h2>
          <div className="small-card">
            <img src={Step} alt="Steps icon" />
            <span id="steps">{stepCountLastEntry}</span>
            <span>steps</span>
          </div>
          <div className="small-card">
            <img src={CaloriesBurn} alt="Calories icon" />
            <span id="calories">{calories}</span>
            <span>calories</span>
          </div>
          <div className="small-card">
            <img src={Pressure} alt="bp icon" />
            <span id="bp">{(bloodPressure[0] + bloodPressure[1]) / 2}</span>
            <span>Blood Pressure</span>
          </div>
          {/* Repeat for other cards */}{" "}
        </div>
        <div
          id="graph"
          className="graph"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Graph</h2>
          <div
            className="graph-internal"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="graph-small-card">
              {/* <img src={Graph} className="graph-img" alt="calories" /> */}
              {/* <canvas id="caloriesChart"></canvas> */}
              <canvas
                id="caloriesChart"
                className="chart-container"
                style={{
                  height: "400px",
                }}
              ></canvas>
            </div>
            <div className="graph-small-card">
              {/* <img src={Graph} className="graph-img" alt="calories" /> */}
              <canvas
                id="heartRateChart"
                className="chart-container"
                style={{
                  height: "400px",
                }}
              ></canvas>
            </div>
            <div className="graph-small-card">
              {/* <img src={Graph} className="graph-img" alt="calories" /> */}
              <canvas
                id="sleepDurationChart"
                className="chart-container"
                style={{
                  height: "400px",
                }}
              ></canvas>
            </div>
            <div className="graph-small-card">
              {/* <img src={Graph} className="graph-img" alt="calories" /> */}
            </div>
          </div>
        </div>
        <div id="sleep" className="card">
          <h2>Sleep</h2>
          <div id="sleep-bar">
            <div id="sleep-progress"></div>
          </div>
          <span id="sleep-percentage">0%</span>
          <span>of 8 hours</span>
        </div>
        {/* Repeat for other sections */}{" "}
      </div>
      <RightProfileBar username={username} />
    </div>
  );
}

export default Dashboard;
