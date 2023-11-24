import React, { useState } from 'react';
import WelcomeMessage from './components/WelcomeMessage';
import TextInputForm from './components/TextInputForm';
import Banner from './components/Banner';
import SentimentPieChart from './components/SentimentPieChart';
import WordCloud from './components/WordCloud';
import TopWords from './components/TopWords';
import CommentsTable from './components/CommentsTable';

const stopwords = [
  'a', 'about', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'both', 'but', 
  'by', 'can', 'did', 'do', 'does', 'down', 'each', 'few', 'for', 'from', 'had', 'has', 'have', 'he', 'her', 
  'here', 'him', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'more', 'most', 'my', 'no', 
  'not', 'now', 'of', 'on', 'one', 'only', 'or', 'other', 'our', 'out', 'over', 's', 'she', 'so', 'some', 
  'such', 't', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those', 
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 
  'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your'
];

function getWordFrequency(text) {
  text = text.toLowerCase()
      .replace(/n't/g, ' not')
      .replace(/'re/g, ' are')
      .replace(/'s/g, ' is')
      .replace(/'m/g, ' am')
      .replace(/'ll/g, ' will')
      .replace(/'ve/g, ' have')
      .replace(/'d/g, ' would')
      .replace(/[\r\n]+/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[\w.]+@\w+\.\w+/g, ' ');

  let words = text.match(/\b[a-zA-Z']{3,}\b/g);
  if (!words) return [];

  words = words.filter(word => !stopwords.includes(word) && !word.includes("'"));

  const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
  }, {});

  return Object.entries(wordCount)
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value);
}

function App() {
    const [averagePositiveSentiment, setAveragePositiveSentiment] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [sentimentData, setSentimentData] = useState([0, 0, 0, 0]);
    const [wordCloudData, setWordCloudData] = useState([]);
    const [rawText, setRawText] = useState('');
    const [commentsData, setCommentsData] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleAnalysisComplete = (results) => {
        console.log("Sentiment Analysis Results:", results);

        let sentimentCounts = { Positive: 0, Negative: 0, Neutral: 0, Mixed: 0 };
        results.forEach(result => {
            if (result) {
                const sentimentData = JSON.parse(result);
                const highestSentiment = Object.keys(sentimentData.sentimentScore).reduce((a, b) => sentimentData.sentimentScore[a] > sentimentData.sentimentScore[b] ? a : b);
                sentimentCounts[highestSentiment]++;
            }
        });

        const chartData = [sentimentCounts.Positive, sentimentCounts.Negative, sentimentCounts.Neutral, sentimentCounts.Mixed];
        setSentimentData(chartData);

        const validResults = results.filter(result => result != null);
        setTotalComments(validResults.length);

        const totalPositiveScore = validResults.reduce((acc, result) => {
            const sentimentData = JSON.parse(result);
            return acc + (sentimentData.sentimentScore ? sentimentData.sentimentScore.Positive : 0);
        }, 0);

        setAveragePositiveSentiment(validResults.length > 0 ? totalPositiveScore / validResults.length : 0);
        setWordCloudData(getWordFrequency(rawText));

        const comments = rawText.split('\n').filter(comment => comment.trim() !== '');
        const extractedCommentsData = comments.map((comment, index) => ({
            text: comment,
            sentiment: results[index] ? JSON.parse(results[index]).sentiment : 'N/A'
        }));
        setCommentsData(extractedCommentsData);
        setHasSubmitted(true);
    };

    const handleTextChange = (text) => {
        setRawText(text);
    };

    return (
      <div className="App">
          <div className="content-area">
              {!hasSubmitted && <WelcomeMessage />}
              {hasSubmitted && (
                  <>
                      <Banner averageSentiment={averagePositiveSentiment} totalComments={totalComments} />
                      <div className="charts-container">
                          <SentimentPieChart sentimentData={sentimentData} />
                          <WordCloud words={wordCloudData} />
                      </div>
                      <div className="analysis-container">
                          <TopWords wordData={wordCloudData.slice(0, 10)} />
                          <CommentsTable commentsData={commentsData} />
                      </div>
                  </>
              )}
          </div>
          <TextInputForm onAnalysisComplete={handleAnalysisComplete} onTextChange={handleTextChange} />
      </div>
  );
  
}

export default App;
