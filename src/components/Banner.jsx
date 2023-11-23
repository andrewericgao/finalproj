import React from 'react';
import './Banner.css'; // Importing the CSS for styling

const Banner = ({ averageSentiment, totalComments }) => {
    return (
        <div className="banner">
            <div className="banner-item">
                <span className="banner-title">Average Sentiment Score</span>
                <span className="banner-value">{averageSentiment.toFixed(2)}</span>
            </div>
            <div className="banner-item">
                <span className="banner-title">Analyzed Comments</span>
                <span className="banner-value">{totalComments}</span>
            </div>
        </div>
    );
};

export default Banner;
