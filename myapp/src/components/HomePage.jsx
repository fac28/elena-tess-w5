// import PropTypes from "prop-types";

const HomePage = ({ onStartClick }) => {
  return (
    <div>
      <h1>Welcome to the Trivia Game!</h1>
      <p>Click the "Start" button to begin.</p>
      <button onClick={onStartClick}>Start</button>
    </div>
  );
};

// HomePage.propTypes = {
// onStartClick: PropTypes.boo
// };

export default HomePage;
