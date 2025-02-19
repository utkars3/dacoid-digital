// import  from "react";
import PropTypes from "prop-types";
const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      <h2>Your Score: {score}</h2>
    </div>
  );
};

Scoreboard.propTypes = {
    score: PropTypes.number.isRequired, // Ensure `score` is a required number
};

export default Scoreboard;
