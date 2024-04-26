import axios from 'axios';
import { useEffect, useState } from 'react';
import { Chart, CategoryScale } from 'chart.js/auto'; // Import Chart.js and CategoryScale

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
    const sectionValues = Object.values(sectionScores).map((section) => section.percentage);

    const ctx = document.getElementById('myChart').getContext('2d'); // Replace with your canvas element ID
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
    <div>
      <h2>Report</h2>
      {reportData ? (
        <>
          <canvas id="myChart" /> {/* Add a canvas element for the chart */}
          <ul>
            {Object.entries(reportData.sectionScores).map(([sectionName, sectionData]) => (
              <li key={sectionName}>
                <b>{sectionName}:</b> {sectionData.percentage}% correct ({sectionData.correct} out of {sectionData.total})
                <br />
                {reportData.recommendations[sectionName]}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading report data...</p>
      )}
    </div>
  );
}

export default Report;
