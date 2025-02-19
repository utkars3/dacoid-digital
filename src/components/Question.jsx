import { useState } from "react";
import PropTypes from "prop-types";
const Question = ({ question, onAnswer }) => {
    const [userInput, setUserInput] = useState("");

    const handleSubmit = () => {
        if (question.type === "integer") {
            onAnswer(parseInt(userInput));  // ✅ Send integer answer
        } else {
            onAnswer(userInput);  // ✅ Send multiple-choice answer
        }
        setUserInput(""); // Reset input field after submitting
    };

    return (
      <>
        <div className="question-container">
            <h3>{question.text}</h3>

            {question.type === "integer" ? (
                // ✅ Show input field for integer-type questions
                <input 
                    type="number" 
                    value={userInput} 
                    onChange={(e) => setUserInput(e.target.value)} 
                    placeholder="Enter your answer"
                />
            ) : (
                // ✅ Show multiple-choice buttons for MCQs
                question.options.map((option, index) => (
                    <button className="answer-btn" key={index} onClick={() => onAnswer(option)}>
                        {option}
                    </button>
                ))
            )}

            <button id="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
        </>
    );
};

Question.propTypes = {
  question: PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["integer", "mcq"]).isRequired,
      options: PropTypes.arrayOf(PropTypes.string),  // ✅ Only required for MCQs
      correctAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default Question;
