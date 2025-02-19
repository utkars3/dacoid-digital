import { useState } from "react";
import questions from "../data/question";

export const useQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [quizOver, setQuizOver] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState([]); // ✅ Stores previous attempts

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];

    // ✅ Check correctness for integer-type questions
    if (currentQuestion.type === "integer") {
      if (parseInt(answer) === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1); // ✅ Increase score if correct
        setAnswerFeedback("Correct!");
      } else {
        setAnswerFeedback("Incorrect!");
      }
    } else {
      // ✅ Handle MCQ-based answers
      if (answer === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
        setAnswerFeedback("Correct!");
      } else {
        setAnswerFeedback("Incorrect!");
      }
    }

    // After 2 seconds, move to the next question or finish the quiz
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        quizOverHandler(); // ✅ Call quizOverHandler to store attempt
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswerFeedback("");
      }
    }, 300); // Delay of 2 seconds for feedback visibility
  };

  const quizOverHandler = () => {
    setQuizOver(true);
    
    // ✅ Save the attempt history
    const timestamp = new Date().toLocaleString();
    setAttemptHistory((prevHistory) => [
      ...prevHistory,
      { score, timestamp },
    ]);
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setAnswerFeedback("");
    setQuizOver(false);
  };

  return {
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    handleAnswer,
    answerFeedback,
    quizOver,
    quizOverHandler,
    resetQuiz, 
    attemptHistory, 
  };
};
