import React, { useState } from 'react';

const TextAnalysisForm = () => {
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');

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
            const result = await response.text();
            setResponse(JSON.parse(result).body);
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        callAPI(text);
    }

    return (
        <div>
            <h1>TEXT SENTIMENT ANALYSIS</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                <button type="submit">ANALYZE SENTIMENT</button>
            </form>
            {response && <p>Sentiment Analysis Result: {response}</p>}
        </div>
    );
};

export default TextAnalysisForm;
