import React from 'react';
import './commentsTable.css';
// import './SentimentPieChart.css';

const CommentsTable = ({ commentsData }) => {
  if (commentsData.length === 0) {
    return <div className="comments-table-empty">No comments to display</div>;
  }

  return (
    <div className="comments-table-container">
      <table className="comments-table">
        <thead>
          <tr>
            <th>Comment</th>
            <th>Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {commentsData.map((comment, index) => (
            <tr key={index}>
              <td>{comment.text}</td>
              <td>
                <span className={`sentiment-cell sentiment-${comment.sentiment.toLowerCase()}`}>
                  {comment.sentiment}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;
