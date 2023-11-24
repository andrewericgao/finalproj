import React from 'react';
import './Banner.css';

const Banner = ({ averageSentiment, totalComments }) => {
    return (
        <div className="banner">
            <div className="banner-item">
                <span className="banner-title" aria-label="Average Sentiment Score">Average Sentiment Score</span>
                <span className="banner-value">{averageSentiment.toFixed(2)}</span>
            </div>
            <div className="banner-item">
                <span className="banner-title" aria-label="Analyzed Comments">Analyzed Comments</span>
                <span className="banner-value">{totalComments}</span>
            </div>
        </div>
    );
};

export default Banner;
