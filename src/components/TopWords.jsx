// TopWords.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './TopWords.css';

const TopWords = ({ wordData }) => {
    // Sort the word data by frequency in descending order
    const sortedWordData = [...wordData].sort((a, b) => b.value - a.value);

    const data = {
        labels: sortedWordData.map(word => word.text),
        datasets: [{
            label: 'Word Frequency',
            data: sortedWordData.map(word => word.value),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 5, // Rounded bars
            borderSkipped: false
        }]
    };

    const options = {
        indexAxis: 'y', // Horizontal bar chart
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false // Hides the legend for a cleaner look
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Frequency'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Words'
                }
            }
        }
    };

    return (
        <div className="top-words-chart">
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default TopWords;
