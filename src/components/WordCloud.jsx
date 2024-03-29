import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import './WordCloud.css';

const WordCloud = ({ words }) => {
    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
        fontSizes: [12, 60],
        scale: 'sqrt',
        spiral: 'rectangular',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 'bold',
        padding: 1,
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
    };

    return (
        <div className="word-cloud">
            <ReactWordcloud words={words} options={options} />
        </div>
    );
};

export default WordCloud;
