import PropTypes from 'prop-types';

const RenderQuestion = ({questions, handleAnswerChange}) => {
    return (
    <ul>
        {questions.map(question => (
          <li key={question.question}>
            <h3>Question: {question.question}</h3>
            <div>
              {
              question.answers.map((answer) => (
                <label key={answer}>
                  <input
                    type="radio"
                    name={`question${question.question}`}
                    value={answer}
                    onChange={handleAnswerChange}
                  />
                  {answer}
                </label>
           
              ))}
            </div>
            <p>Correct Answer: {question.correct_answer}</p>
          </li>
        ))}
      </ul>
      )
}

RenderQuestion.propTypes = {
    questions: PropTypes.array.isRequired,
    handleAnswerChange: PropTypes.func.isRequired,
  };

export default RenderQuestion;