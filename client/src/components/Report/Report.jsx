import axios from 'axios';
import { Chart } from 'chart.js/auto'; // Import Chart.js and CategoryScale
import { useEffect, useState } from 'react';
import './Report.css'; // Import the CSS file for styling
import Navbar from '../Navbar/Navbar';

function Report() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/v1/analyse/report', {
        userId: '662b5275a6579e65c53381f6',
        quizId: '662b9c95cba2afe6be25c2fa',
      })
      .then((res) => {
        setReportData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching report data:', err);
      });
  }, []);

  // Function to create the chart using Chart.js
  const createChart = (reportData) => {
    if (!reportData || !reportData.sectionScores) {
      return; // Handle missing data gracefully
    }

    const sectionScores = reportData.sectionScores;
    const sectionLabels = Object.keys(sectionScores);
    const sectionValues = Object.values(sectionScores).map(
      (section) => section.percentage.toFixed(2) // Round percentage to 2 decimal places
    );

    const ctx = document.getElementById('myChart').getContext('2d');

    // Destroy any existing chart before creating a new one
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'bar', // Use bar chart for percentage visualization
      data: {
        labels: sectionLabels,
        datasets: [
          {
            label: 'Section Scores (%)',
            data: sectionValues,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Orange
              'rgba(54, 162, 235, 0.2)', // Blue
              // Add more colors if needed for additional sections
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              // Add more colors if needed
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true, // Ensure y-axis starts at 0 for percentages
                max: 100, // Set maximum to 100 for percentages
              },
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    if (reportData) {
      createChart(reportData); // Call chart creation on data update
    }
  }, [reportData]);

  return (
    <div style={{marginBottom:"3rem"}}>
    <Navbar />
      <h2 className='report-header'>Report</h2>
      {reportData ? (
        <>
          <div className='chartContainer'>
            <canvas id="myChart" /> {/* Add a canvas element for the chart */}
          </div>
          <div className="cardContainer">
            <div className="card">
              <h3 style={{fontSize:"1.6rem"}}>Total Marks</h3>
              <p>20</p>
            </div>
            {Object.entries(reportData.sectionScores).map(([sectionName, sectionData]) => (
              <div className="card" key={sectionName}>
                <h3 style={{fontSize:"1.6rem"}} >{sectionName}</h3>
                <p>{sectionData.percentage.toFixed(2)}%</p> {/* Round percentage to 2 decimal places */}
              </div>
            ))}
          </div>
          <div className='recommendations'>Our recommendations</div>
          <ul>
            {Object.entries(reportData.sectionScores).map(
              ([sectionName, sectionData]) => (
                <li key={sectionName}>
                  <b>{sectionName}:</b> {sectionData.percentage.toFixed(2)}% correct (
                  {sectionData.correct} out of {sectionData.total})
                  <br />
                  {reportData.recommendations[sectionName]}
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
  );
}

export default Report;
