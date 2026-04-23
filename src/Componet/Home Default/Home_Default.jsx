import React, { useState } from 'react';
import '../../Componet/Home Default/Home_Default.css'
import { useGetAllQuizQuery } from '../../Redux/api/Quiz.Api';
import { useGetAllQuizContentQuery } from '../../Redux/api/QuizContent.Api';


function Quiz(props) {

    const [index, setIndex] = useState(0);
    const [current, setCurrent] = useState({});
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState(false)

    const { data: Quiz } = useGetAllQuizQuery();

    console.log("AlldataQuizzzz",Quiz);

    const { data: QuizContent } = useGetAllQuizContentQuery();

    console.log("AlldataQuiz", QuizContent?.data);

    const data = QuizContent?.data || [];
    const question = data[index];

    console.log(data);
    console.log(question);


    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1)
        }
    }

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    const handleOption = (v, id) => {
        console.log(v);

        let qId = question._id

        if (answer) return;

        setAnswer((prev) => ({
            ...prev,
            [qId]: true
        }))

        const correctAnswer = data?.find((v) => v._id === id);

        if (correctAnswer.answer === v) {
            setScore(v => v + 1);
        }
    }

    console.log(score);

    return (
        <div className='contanier'>
            <h1>Quiz App</h1>
            <hr />
            <h2>{question?.question}</h2>

            <ul>
                {question?.option?.map((v, i) => (
                    <li key={i} onClick={() => handleOption(v, question._id)}>
                        {v}
                    </li>
                ))}
            </ul>

            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext}>Next</button>

            <div className='index'>
                {index + 1} of {question?.length} question
            </div>
        </div>
    );
}

export default Quiz;