import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TextInputForm.css';
import { ReactComponent as UpArrowIcon } from './up-arrow-icon.svg';

const TextInputForm = ({ onAnalysisComplete, onTextChange }) => {
    const [text, setText] = useState('');
    const [isTextEntered, setIsTextEntered] = useState(false);
    const [visibleSets, setVisibleSets] = useState({});

    useEffect(() => {
        const timers = [
            setTimeout(() => setVisibleSets((v) => ({ ...v, instagramComments: true })), 400),  // After 500ms
            setTimeout(() => setVisibleSets((v) => ({ ...v, twitterComments: true })), 800), // After 1000ms
            setTimeout(() => setVisibleSets((v) => ({ ...v, linkedinComments: true })), 1200), // After 1500ms
            setTimeout(() => setVisibleSets((v) => ({ ...v, wildcard: true })), 1600),         // After 2000ms
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const predefinedComments = {
        instagramComments: 
        "Love the vibrant colors in this photo, really stands out!\n" +
        "This post lacks originality and feels repetitive.\n" +
        "A decent shot, but nothing extraordinary.\n" +
        "Mixed feelings about this post, some parts I like, some not.\n" +
        "Engaging content, but the caption could be better.\n" +
        "Incredible creativity, your posts never disappoint!\n" +
        "Not a fan of this style, seems a bit off.\n" +
        "An okay post, but I've seen similar content elsewhere.\n" +
        "Your storytelling in this post is fantastic!\n" +
        "The photo is good, but the filter overpowers the natural beauty.",
        twitterComments: 
        "Impressed with the quick response to current events.\n" +
        "This tweet is spreading misinformation, not cool.\n" +
        "An average tweet, not much engagement.\n" +
        "Interesting opinion, but some replies raise valid concerns.\n" +
        "Love how you interact with your followers, very engaging.\n" +
        "Tweet lacks context, feels incomplete.\n" +
        "Solid tweet, informative and to the point.\n" +
        "Mixed reactions here, some support, some disagree.\n" +
        "Your humor in tweets is always a day brightener!\n" +
        "The thread is good, but some comments are off-topic.",
        linkedinComments: 
        "Professional insight, very informative and helpful.\n" +
        "Feels more like a sales pitch than genuine advice.\n" +
        "Good article, but it covers well-known information.\n" +
        "A mix of good advice and promotional content.\n" +
        "Solid networking tips, definitely using these!\n" +
        "The post lacks depth on the subject matter.\n" +
        "Great insights on industry trends, very helpful.\n" +
        "Some points are good, others not backed by data.\n" +
        "Your leadership advice is always on point!\n" +
        "Informative post, but the writing style is a bit dry.",
        wildcard: 
        "Really impressed with the quick turnaround on this project, well done!\n" +
        "The presentation lacked depth and didn't cover the key points.\n" +
        "A typical response, didn’t really address my concerns.\n" +
        "Some parts of the report were excellent, while others were unclear.\n" +
        "Enjoyed the lively discussion in today's meeting, very productive.\n" +
        "The article was informative, but it missed some latest updates.\n" +
        "Good effort, but there's a lot of room for improvement.\n" +
        "Varied opinions in this thread, making it an interesting read.\n" +
        "Thanks for consistently providing valuable insights in your posts.\n" +
        "The strategy is sound, but its execution could be challenging."
        };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        onTextChange(newText);
        setIsTextEntered(newText.trim() !== '');
    };

    const handlePredefinedCommentClick = (comment) => {
        setText(comment);
        setIsTextEntered(true);
        onTextChange(comment);
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
            {!isTextEntered && (
                <AnimatePresence>
                    <motion.div 
                        className="predefined-comments-container"
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        transition={{ staggerChildren: 0.5 }}
                    >
                        {Object.entries(predefinedComments).map(([platform, comments]) => visibleSets[platform] && (
                            <motion.div key={platform} className="predefined-comment-set"
                                variants={variants}>
                                <button
                                    className="predefined-set-button"
                                    onClick={() => handlePredefinedCommentClick(comments)}
                                >
                                    <span className="platform-name">{platform.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="comment-preview">"{comments.split('\n')[0].slice(0, 30)}..."</span>
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
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