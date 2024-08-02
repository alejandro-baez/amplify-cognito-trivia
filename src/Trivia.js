import React, { useState } from 'react';
import triviaData from './triviaData';

function Trivia() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerOptionClick = (option) => {
    const correctAnswer = triviaData[currentQuestion].answer;
    setSelectedAnswer(option);
    if (option === correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Delay 
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < triviaData.length) {
        setCurrentQuestion(nextQuestion);
        setIsCorrect(null); 
        setSelectedAnswer(""); 
      } else {
        setShowScore(true);
      }
    }, 1000); 
  };

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {triviaData.length}
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{triviaData.length}
            </div>
            <div className='question-text'>{triviaData[currentQuestion].question}</div>
          </div>
          <div className='answer-section' style={{padding: "10px"}}>
            {triviaData[currentQuestion].options.map((option) => (
              <button 
                onClick={() => handleAnswerOptionClick(option)} 
                key={option}
                style={{ backgroundColor: selectedAnswer === option ? (isCorrect ? 'lightgreen' : 'pink') : '' , margin: "5px" }}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div style={{ marginTop: '10px' }}>
              {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Trivia;