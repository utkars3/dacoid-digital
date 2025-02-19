import PropTypes from 'prop-types';

const Feedback = ({ feedback }) => {
  return (
    <div className="feedback">
      <p>{feedback}</p>
    </div>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.string.isRequired,
};

export default Feedback;
