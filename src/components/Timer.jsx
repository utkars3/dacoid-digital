import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          onTimeUp();  // Auto-submit answer on timeout
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Runs only on component mount

  return <div className="timer">Time Left: {timeLeft}s</div>;
};

Timer.propTypes = {
  onTimeUp: PropTypes.func.isRequired, // Ensures onTimeUp is a required function
};

export default Timer;
