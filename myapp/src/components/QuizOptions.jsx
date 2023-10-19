import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const QuizOptions = ({  onOptionUpdate }) => {
    const [difficulty, setDifficulty] = useState(undefined);
    const [category, setCategory] = useState(undefined);

    useEffect(() => {
        const options = {
            difficulty: difficulty, // type "easy" | "medium" | "hard" | undefined
            category: category, 
        };
        onOptionUpdate(options);
    }, [onOptionUpdate, difficulty, category])
    
    return (
        <div className="quiz_options">
            <label htmlFor="difficulty" className="select_label">Select Difficulty:</label><br />
            <input type="radio" id="easy" name="difficulty" value="easy" onChange={() => setDifficulty("easy")}/>
            <label htmlFor="easy">Easy</label><br />
            <input type="radio" id="medium" name="difficulty" value="medium" onChange={() => setDifficulty("medium")}/>
            <label htmlFor="medium">Medium</label><br />
            <input type="radio" id="hard" name="difficulty" value="hard" onChange={() => setDifficulty("hard")}/>
            <label htmlFor="hard">Hard</label><br />
            <input type="radio" id="any" name="difficulty" value="any" onChange={() => setDifficulty(undefined)}/>
            <label htmlFor="any">Any</label><br /><br />

            <label htmlFor="category" className="select_label">Select Category:</label><br />
            <select id="category" name="category" onChange={(event) => setCategory(event.target.value)}>
                <option value="general_knowledge">General Knowledge</option>
                <option value="sports">Sports</option>
                <option value="music">Music</option>
                <option value="board_games">Board Games</option>
                <option value="film">Film</option>
                <option value="computers">Computers</option>
                <option value="geography">Geography</option>
                <option value="history">History</option>
                <option value="any">Any</option>
            </select><br /><br />
        </div>
    );
};

QuizOptions.propTypes = {
    onOptionUpdate: PropTypes.func.isRequired, 
}

export { QuizOptions };
