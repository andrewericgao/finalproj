import React from 'react';
import { Bar } from 'react-chartjs-2';
import Sentiment from 'sentiment';
import './TopWords.css';

const sentiment = new Sentiment();

const TopWords = ({ wordData }) => {
    const sortedWordData = [...wordData].sort((a, b) => b.value - a.value);

    // Function to determine the color based on sentiment score
    const getSentimentColor = (word) => {
        const result = sentiment.analyze(word);
        if (result.score > 0) return '#49A54D'; // Positive sentiment
        if (result.score < 0) return '#D32F2F';   // Negative sentiment
        return '#FFC107';                        // Neutral sentiment
    };

    const data = {
        labels: sortedWordData.map(word => word.text),
        datasets: [{
            label: 'Word Frequency',
            data: sortedWordData.map(word => word.value),
            backgroundColor: sortedWordData.map(word => getSentimentColor(word.text)),
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            borderRadius: 5,
            borderSkipped: false
        }]
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
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
