import PropTypes from "prop-types";
import { useState } from "react";

import { QuizOptions } from "./QuizOptions";

const HomePage = ({ onStartClick }) => {
  const [options, setOptions] = useState({});
  return (
    <div className="start_page">
      <QuizOptions onOptionUpdate={setOptions}/>
      <h1>Welcome to the Trivia Game!</h1>
      <p>Click the <span className="start_text">Start</span> to begin.</p>
      <button  className="btn" onClick={() => onStartClick(options)}>Start</button>
    </div>
  );
};

HomePage.propTypes = {
onStartClick: PropTypes.func.isRequired,
};

export default HomePage;
