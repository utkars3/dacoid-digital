import { useEffect } from "react";
import Question from "./Question.jsx";
import Timer from "./Timer.jsx";
import Feedback from "./Feedback.jsx";
import { useQuiz } from "../hooks/useQuiz.js";
import { saveQuizHistory } from "../utils/indexedDB.js";
import Scoreboard from "./Scoreboard.jsx";

const Quiz = () => {
  const {
    questions,
    currentQuestionIndex,

    score,
    handleAnswer,
    answerFeedback,
    quizOver,

    resetQuiz,
    attemptHistory,
  } = useQuiz();

  const handleNextQuestion = (answer) => {
    handleAnswer(answer);
  };

  useEffect(() => {
    if (quizOver) {
      saveQuizHistory(score);
    }
  }, [quizOver, score]);

  return (
    <div className="question-box ">
      {!quizOver && <Timer key={currentQuestionIndex} onTimeUp={handleAnswer}/>}
      
      {quizOver ? (
        <>
          <Scoreboard score={score} />
          {/* Retry button to start a new attempt */}
          <button onClick={resetQuiz}>Retry Quiz</button>
          {/* Display attempt history */}
          <h3>Attempt History:</h3>
          <ul>
            {attemptHistory.map((attempt, index) => (
              <li key={index}>
                <span>Score: {attempt.score}</span> -{" "}
                <span>{attempt.timestamp}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleNextQuestion}
          />
          {answerFeedback && <Feedback feedback={answerFeedback} />}
        </>
      )}
    </div>
  );
};

export default Quiz;
