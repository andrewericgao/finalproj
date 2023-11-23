import React, { useState } from 'react';
import './TextInputForm.css';

const TextInputForm = ({ onAnalysisComplete,onTextChange }) => {
    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(newText); // Call the passed function with the new text
    };

    const callAPI = async (inputText) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({ "text": inputText });
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch("https://eip9ikhrl0.execute-api.us-east-2.amazonaws.com/dev", requestOptions);
            const result = await response.json();
            return result.body;
        } catch (error) {
            console.error('error', error);
            return null; // Return null or an appropriate error response
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const comments = text.split('\n').filter(comment => comment.trim() !== '');
        const results = await Promise.all(comments.map(comment => callAPI(comment)));
        onAnalysisComplete(results); 
    };

    return (
        <div className="text-input-form">
            <form onSubmit={handleSubmit}>
                <label className="input-label">
                    Enter your text (one comment per line):
                </label>
                <textarea 
            className="text-input" 
            value={text} 
            onChange={handleTextChange} // Update to use handleTextChange
            placeholder="Type your comments here..." 
        />
                <button type="submit" className="submit-button">Analyze Sentiment</button>
            </form>
        </div>
    );
};

export default TextInputForm;