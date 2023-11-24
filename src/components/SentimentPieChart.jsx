import React from 'react';
import { Pie } from 'react-chartjs-2';
import './SentimentPieChart.css';

const SentimentPieChart = ({ sentimentData }) => {
    const data = {
        labels: ['Positive', 'Negative', 'Neutral', 'Mixed'],
        datasets: [
            {
                label: 'Sentiment Distribution',
                data: sentimentData,
                backgroundColor: ['#49A54D', '#D32F2F', '#FFC107', '#7B1FA2'],
                borderWidth: 0,
                hoverOffset: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                    padding: 25,
                    font: {
                        size: 18,
                        family: "'Roboto', sans-serif",
                    },
                    color: '#343a40'
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#212529',
                titleFont: {
                    size: 20,
                    weight: 'bold',
                    family: "'Roboto', sans-serif"
                },
                bodyFont: {
                    size: 18,
                    family: "'Roboto', sans-serif"
                },
                padding: 20,
                cornerRadius: 6,
                caretSize: 8,
                bodySpacing: 7,
            }
        },
        cutout: '65%',
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    return (
        <div className="sentiment-pie-chart">
            <Pie data={data} options={options} />
        </div>
    );
};

export default SentimentPieChart;
