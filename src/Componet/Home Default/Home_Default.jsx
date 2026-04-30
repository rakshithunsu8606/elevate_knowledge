import React, { useState } from 'react';
import '../../Componet/Home Default/Home_Default.css'
import { useGetAllQuizQuery } from '../../Redux/api/Quiz.Api';
import { useGetAllQuizContentQuery } from '../../Redux/api/QuizContent.Api';
import { useParams } from 'react-router';


function Quiz(props) {

    const [index, setIndex] = useState(0);
    const [current, setCurrent] = useState({});
    const [score, setScore] = useState(0)
    const [answer, setAnswer] = useState({})
    const [result, setResult] = useState(false)

    const param = useParams();


    const { data: Quiz } = useGetAllQuizQuery();

    console.log("AlldataQuizzzz", Quiz);

    const { data: QuizContent } = useGetAllQuizContentQuery();

    console.log("AlldataQuiz", QuizContent?.data);

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
            setIndex(index + 1)
        }
    }

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    const handleOption = (e, v) => {
        console.log(v);
        console.log(e);


        let qId = question._id

        console.log(qId);

        if (answer[qId]) return;

        setAnswer((prev) => ({
            ...prev,
            [qId]: v
        }))


        if (question.answer === v) {
            setScore(v => v + 1);
        }

        if (index < data.length - 1) {
            setIndex(index + 1)
        }

        if (index === data.length - 1) {
            setResult(true);
            return 0;
        }
    }

    console.log(score);

    return (
        <div className='contanier'>
            <h1>Quiz App</h1>
            <hr />
            {/* <span>Your Score {score} out of {data.length}</span> */}
            {result ? <>
                <h2>You Scored {score} out of {data?.length}</h2>

                <div
                    className='profile-Body'
                    style={{
                        marginBottom: "25px",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                    }}
                >
                    {
                        data?.map((v, i) => {
                            const userAnswer = answer[v._id];
                            const correctAnswer = v.answer;
                            return (
                                <>

                                    <p className="question-text">
                                        <span>Q{i + 1}.</span> {v?.question}
                                    </p>

                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '10px',
                                        paddingLeft: '10px'
                                    }}>
                                        <ul style={{
                                            width:'24rem'
                                        }}> 
                                            {v?.option?.map((v, i) => {
                                                const Right = v === correctAnswer;
                                                const isSelected = v === userAnswer;

                                                return (
                                                    <div
                                                        key={i}
                                                        className={`
                                                    profile-card options
                                                ${Right ? "correct" : ""}
                                                ${isSelected && !Right ? "wrong" : ""}
                                            `}
                                                    >
                                                        {String.fromCharCode(65 + i)}. {v}
                                                    </div>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </>
                            )
                        })

                    }

                </div>

            </> :
                <>
                    <h2>{question?.question}</h2>

                    <ul>
                        {question?.option?.map((v, i) => (
                            <li onClick={(e) => handleOption(e, v)}>
                                {v}
                            </li>
                        ))}
                    </ul>                        

                    <button onClick={handlePrev}>Prev</button>
                    <button onClick={handleNext}>Next</button>

                    <div className='index'>
                        {index + 1} of {data?.length} question
                    </div></>}


        </div>
    );
}

export default Quiz;