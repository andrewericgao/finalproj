// SentimentPieChart.jsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import './SentimentPieChart.css'; // Importing the CSS for styling

const SentimentPieChart = ({ sentimentData }) => {
    const data = {
        labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
        datasets: [
            {
                label: 'Sentiment Distribution',
                data: sentimentData,
                backgroundColor: ['#4caf50', '#f44336', '#ffeb3b', '#9e9e9e'],
                borderWidth: 0, // No borders for a cleaner look
                hoverOffset: 4, // Slight offset on hover for interactivity
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Better control for responsiveness
        plugins: {
            legend: {
                position: 'bottom', // Legend at the bottom for better layout
                labels: {
                    boxWidth: 20,
                    padding: 20,
                    font: {
                        size: 14 // Larger font for readability
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip styling
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14
                },
                padding: 10
            }
        }
    };

    return (
        <div className="sentiment-pie-chart">
            <Pie data={data} options={options} />
        </div>
    );
};

export default SentimentPieChart;
