import React, { useState } from 'react';
import styles from './Quiz.module.css';

interface IAnswer {
  text: string;
  isCorrect: boolean;
}

interface IQuestion {
  question: string;
  answers: IAnswer[];
}

interface QuizProps {
  questions: IQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answersStatus, setAnswersStatus] = useState<(boolean | null)[]>(new Array(questions.length).fill(null));

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswerIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIndex !== null) {
      const isCorrect = questions[currentQuestionIndex].answers[selectedAnswerIndex].isCorrect;
      const updatedAnswersStatus = [...answersStatus];
      updatedAnswersStatus[currentQuestionIndex] = isCorrect;
      setAnswersStatus(updatedAnswersStatus);

      if (isCorrect) {
        setCorrectAnswersCount(prev => prev + 1);
      }

      setSelectedAnswerIndex(null);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setCorrectAnswersCount(0);
    setAnswersStatus(new Array(questions.length).fill(null));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <>
          <div className={styles.questionHeader}>
            <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
          </div>
          <div className={styles.questionText}>
            <h3>{currentQuestion.question}</h3>
          </div>
          <ul className={styles.answersList}>
            {currentQuestion.answers.map((answer, index) => {
              let className = styles.answerItem;
              if (selectedAnswerIndex !== null) {
                if (index === selectedAnswerIndex) {
                  className = `${styles.answerItem} ${answer.isCorrect ? styles.selectedCorrect : styles.selectedIncorrect}`;
                }
              }
              return (
                <li
                  key={index}
                  className={className}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {answer.text}
                </li>
              );
            })}
          </ul>
          <div className={styles.nextButtonContainer}>
            <button className={styles.nextButton} onClick={handleNextQuestion} disabled={selectedAnswerIndex === null}>
              Next
            </button>
          </div>
          <div className={styles.progressIndicator}>
            {questions.map((_, index) => (
              <span
                key={index}
                className={`${styles.progressItem} ${answersStatus[index] === null ? '' : answersStatus[index] ? styles.completed : styles.incorrect}`}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.results}>
          <h2>Quiz Completed!</h2>
          <p>You got {correctAnswersCount} out of {questions.length} correct.</p>
          <button className={styles.restartButton} onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
