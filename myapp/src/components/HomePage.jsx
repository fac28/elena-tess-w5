// import PropTypes from "prop-types";

const HomePage = ({ onStartClick }) => {
  return (
    <div className="start_page">
      <h1>Welcome to the Trivia Game!</h1>
      <p>Click the <span className="start_text">Start</span> to begin.</p>
      <button  className="button-51" onClick={onStartClick}>Start</button>
    </div>
  );
};

// HomePage.propTypes = {
// onStartClick: PropTypes.boolean
// };

export default HomePage;
