import React, { useState } from 'react';
import '../../Componet/Home Default/Home_Default.css'
import { useGetAllQuizContentQuery } from '../../Redux/api/QuizContent.Api';
import { useGetAllQuizQuery } from '../../Redux/api/Quiz.Api';
import { useParams } from 'react-router';

function Home_Default() {

    const [index, setIndex] = useState(0);
    const [currentanswer, setCurrentAnswer] = useState({});
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answered, setAnswered] = useState({});

    const param = useParams();

    const { data: Quiz } = useGetAllQuizQuery();
    const { data: QuizContent } = useGetAllQuizContentQuery();

    const findID = Quiz?.data?.find((v) => v.Section_id === param.id);

    console.log(findID);

    const finalQuestion = QuizContent?.data?.filter(
        (v) => v?.quiz_id === findID?._id
    );

    const data = finalQuestion || [];
    const question = data[index];

    console.log(data);
    console.log(question);




    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    console.log(score);


    const handleOption = (selectedOption, curr_id) => {

        const questionId = question._id;

        console.log(questionId);


        if (currentanswer[questionId]) return;

        setCurrentAnswer(prev => ({
            ...prev,
            [questionId]: true
        }));

        setAnswered(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));

        const correctAnswer = data.find((v) => v._id === curr_id);

        if (correctAnswer.answer === selectedOption) {
            setScore(prev => prev + 1);
        }

        if (index === data.length - 1) {
            setShowResult(true);
        } else {
            setIndex(index + 1);
        }
    };

    return (
        <div className='contanier'>
            <h1>Quiz App</h1>
            <hr />

            {showResult ? (
                <>
                    <div className="score-section">
                        <h2>Your score {score} out of {data.length}</h2>
                    </div>

                    {data.map((v, qIndex) => {
                        const userAnswer = answered[v._id];
                        const correctAnswer = v.answer;

                        return (
                            <div
                                className='profile-Body'
                                key={v._id}
                                style={{
                                    marginBottom: "25px",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                                }}
                            >
                                <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: 'black' }}>
                                    <span style={{ marginRight: '10px' }}>
                                        Q{qIndex + 1}
                                    </span>
                                    {v.question}
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px',
                                    paddingLeft: '10px'
                                }}>
                                    {v?.option?.map((opt, i) => {
                                        const isCorrect = opt === correctAnswer;
                                        const isSelected = opt === userAnswer;

                                        return (
                                            <div
                                                key={i}
                                                className={`
                                                    profile-card options
                                                ${isCorrect ? "correct" : ""}
                                                ${isSelected && !isCorrect ? "wrong" : ""}
                                            `}
                                            >
                                                {String.fromCharCode(65 + i)}. {opt}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <div>
                    <h2>{question?.question}</h2>

                    <ul>
                        {question?.option?.map((v, i) => (
                            <li key={i} onClick={() => handleOption(v, question?._id)}>
                                {v}
                            </li>
                        ))}
                    </ul>

                    <button onClick={handlePrev} className='side'>Prev</button>
                    <button onClick={handleNext}>Next</button>

                    <div className='index'>
                        {index + 1} of {data?.length} question
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home_Default;