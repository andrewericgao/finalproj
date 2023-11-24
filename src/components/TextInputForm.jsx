import React, { useState } from 'react';
import './TextInputForm.css';
import { ReactComponent as UpArrowIcon } from './up-arrow-icon.svg';

const TextInputForm = ({ onAnalysisComplete, onTextChange }) => {
    const [text, setText] = useState('');
    const [isTextEntered, setIsTextEntered] = useState(false);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(newText);
        setIsTextEntered(newText.trim() !== '');
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
            return null;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isTextEntered) {
            return;
        }
        const comments = text.split('\n').filter(comment => comment.trim() !== '');
        const results = await Promise.all(comments.map(comment => callAPI(comment)));
        onAnalysisComplete(results);
    };

    return (
        <div className="text-input-form">
            <form onSubmit={handleSubmit}>
                <textarea 
                    className="text-input" 
                    value={text} 
                    onChange={handleTextChange}
                    placeholder="Enter your texts (one comment per line)"
                />
            <button type="submit" className={`submit-button ${isTextEntered ? '' : 'inactive'}`}>
                <UpArrowIcon />
            </button>
            </form>
        </div>
    );
};

export default TextInputForm;
