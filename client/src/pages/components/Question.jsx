import React, { useState } from 'react';
import Tooltip from './Tooltip';

function Question({ question, answers, onAnswerChange, ...otherProps }) {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const handleChange = (event) => {
        const selected = event.target.value;
        setSelectedAnswer(selected);
        if (onAnswerChange) {
            onAnswerChange(selected);
        }
    };

    const tooltips = {
        "Редови": "Описание за Редови двигател",
        "V-Образен": "Описание за V-Образен двигател",
        "Боксер": "Описание за Боксер двигател"
    };

    return (
        <div {...otherProps}>
            {question && <h1>{question}</h1>}
            <form>
                {answers && answers.map((answer, index) => (
                    <div key={index}>
                        <Tooltip text={tooltips[answer]}>
                            <input 
                                type="radio" 
                                id={`answer-${index}`} 
                                name="answer" 
                                value={answer} 
                                checked={selectedAnswer === answer} 
                                onChange={handleChange} 
                            />
                            <label htmlFor={`answer-${index}`}>{answer}</label>
                        </Tooltip>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default Question;
