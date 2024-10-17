import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null); // Store the correct answer separately
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questionCount, setQuestionCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    let timerId;
    if (timeLeft > 0 && questionCount < 10) {
      timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && questionCount < 10) {
      setQuestionCount(questionCount + 1);
      setTimeLeft(10);
      generateQuestion();
    } else if (questionCount === 10) {
      setGameOver(true);
    }
    return () => clearTimeout(timerId);
  }, [timeLeft, questionCount]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 11) + 2;
    const num2 = Math.floor(Math.random() * 11) + 2;
    setQuestion(`${num1} x ${num2} = ?`);
    setCorrectAnswer(num1 * num2); // Store the correct answer
    setAnswer(''); // Clear the input field
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (parseInt(answer, 10) === correctAnswer) {
      setScore(score + 1);
    }
    setQuestionCount(questionCount + 1);
    setTimeLeft(10);
    generateQuestion();
  };

  return (
    <div className="container">
      <h1>Times Tables Test</h1>
      <p>Ten Questions, Ten Seconds to Answer Each One!</p>
      {gameOver ? (
        <div className="gameOver">
          <h2>Game Over!</h2>
          <p>Your final score is {score} out of 10</p>
        </div>
      ) : (
        <div>
          <div className="question">
            <p>{question}</p>
            <p>Time left: {timeLeft} seconds</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="number" value={answer} onChange={handleChange} />
            <button type="submit">Answer</button>
          </form>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
}

export default App;