import React, { useState } from 'react';
import styles from './Events.module.css'; // Importing the CSS module

const Events = () => {
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState('');

  // Simulate ML-generated question
  const handleGenerate = () => {
    // This is where your AI logic to generate questions will go
    const generatedQuestion = `Write a function to reverse a linked list.`;
    setQuestion(generatedQuestion);
  };

  const handleSubmit = () => {
    // Simulate suggestions or corrections from the ML model for the code input
    const mlSuggestions = `Suggestion: Your solution works, but consider optimizing for space complexity by using an iterative approach instead of recursion.`;
    
    setSuggestions(mlSuggestions);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daily Concept Challenge</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Generated Question</h2>
          <textarea
            className={styles.textarea}
            value={question}
            readOnly
            placeholder="Generated question will appear here..."
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Your Code</h2>
          <textarea
            className={styles.textarea}
            rows="50" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your code here..."
          />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Suggestions</h2>
          <textarea
            className={styles.textarea}
            value={suggestions}
            readOnly
            placeholder="Suggestions will appear here..."
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button 
          onClick={handleGenerate}
          className={`${styles.button} ${styles.buttonGenerate}`}
        >
          Generate Question
        </button>
        <button 
          onClick={handleSubmit}
          className={`${styles.button} ${styles.buttonSubmit}`}
        >
          Submit Code
        </button>
      </div>
    </div>
  );
};

export default Events;
