import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, IconButton, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import Textinput from '../../Componet/TextFiled/Textinput';
import { object, string } from 'yup';
import { useAddQuizContentMutation, useDeleteQuizContentMutation, useGetAllQuizContentQuery, useUpdateQuizContentMutation } from '../../../Redux/api/QuizContent.Api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// you will create this API
// import { useAddQuestionMutation } from '../../../Redux/api/Question.Api';

function QuizContent() {
    const { id } = useParams();

    console.log(id);

    const [updatedata, setUpdateData] = useState({});


    const { data: QuizContent } = useGetAllQuizContentQuery();

    console.log("AlldataQuiz", QuizContent?.data);

    const [addQuizContent] = useAddQuizContentMutation()

    const [updataQuizContent] = useUpdateQuizContentMutation()

    const [deleteQuizContent] = useDeleteQuizContentMutation()




    const QuestionSchema = object({
        question: string().required('Enter Question'),
        option1: string().required(),
        option2: string().required(),
        option3: string().required(),
        option4: string().required(),
        answer: string().required('Select Answer'),
    });

    const handleSubmit = async (values) => {
        console.log(values);

        if (Object.keys(updatedata).length > 0) {
            await updataQuizContent({
                _id: updatedata._id,
                quiz_id: id,
                question: values.question,
                option: [
                    values.option1,
                    values.option2,
                    values.option3,
                    values.option4
                ],
                answer: values.answer
            })
            // setUpdateData({});

        } else {
            await addQuizContent({
                quiz_id: id,
                question: values.question,
                option: [
                    values.option1,
                    values.option2,
                    values.option3,
                    values.option4
                ],
                answer: values.answer
            });
        }

    };

    const AllQuizContent_Data = QuizContent?.data?.filter((v) => v.quiz_id === id)

    console.log(AllQuizContent_Data);

    const handleDelete = async (id) => {
        console.log(id);
        deleteQuizContent(id);
    }



    const handlEdit = (val) => {

        console.log(val);

        setUpdateData(val);

    }

    return (
        <div>
            <h2>Quiz Content</h2>

            <Stack direction="row" spacing={2} mt={2}>
                <Button type="submit" variant="contained">
                    Add Question
                </Button>
            </Stack>
            <Formik
                enableReinitialize
                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                    question: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    answer: '',
                }}
                validationSchema={QuestionSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    handleSubmit(values)

                    resetForm()

                }}
            >
                <Form>

                    <Textinput name="question" label="Question" />

                    <Textinput name="option1" label="Option 1" />
                    <Textinput name="option2" label="Option 2" />
                    <Textinput name="option3" label="Option 3" />
                    <Textinput name="option4" label="Option 4" />

                    <Textinput
                        name="answer"
                        label="Select Correct Answer"
                        select
                        sloatProps={{ select: { native: true } }}
                        data={[
                            { value: '', label: '--Select Answer--' },
                            { value: 'option1', label: 'Option 1' },
                            { value: 'option2', label: 'Option 2' },
                            { value: 'option3', label: 'Option 3' },
                            { value: 'option4', label: 'Option 4' },
                        ]}
                    />

                    <Stack direction="row" spacing={2} mt={2}>
                        <Button type="submit" variant="contained">
                            Save Question
                        </Button>
                    </Stack>

                </Form>
            </Formik>

            <div style={{ marginTop: '30px' }}>
                <h2 style={{ fontSize: '35px', textDecoration: 'underline' }}>Questions List</h2>

                {AllQuizContent_Data?.map((v, index) => (
                    <div
                        style={{
                            marginBottom: '15px',
                            padding: '10px',
                            border: '1px solid #e8d465',
                            backgroundColor: '#86bef2'
                        }}
                    >
                        <p style={{ fontSize: '21px' }}><strong>{index + 1}:</strong> {v.question}</p>

                        <ul>
                            {v.option?.map((v, i) => (
                                <li key={i}>
                                    {String.fromCharCode(65 + i)}. {v}
                                </li>
                            ))}
                        </ul>

                        <p><strong>Answer:</strong> {v.answer}</p>

                        <Stack direction="row" spacing={2} mt={1}>
                            <IconButton onClick={() => handlEdit(v)} >
                                <EditIcon style={{ color: '#0000FF' }} />

                            </IconButton>

                            <IconButton onClick={() => handleDelete(v._id)}>
                                <DeleteIcon style={{ color: '#FF0000' }} />
                            </IconButton>
                        </Stack>
                    </div>
                ))}
            </div>

        </div>
    );


}

export default QuizContent;


// import React, { useState } from "react";
// import { Button, Stack, TextField } from "@mui/material";

// function QuizContent() {
//     const [questions, setQuestions] = useState([
//         { question: "", options: [""] }
//     ]);

//     const addQue = () => {
//         setQuestions([...questions, { question: "", options: [""], answer: "" }]);
//     };

//     const removeQue = (index) => {
//         const updated = [...questions];
//         updated.splice(index, 1);
//         setQuestions(updated);
//     };

//     const addOpt = (i) => {
//         const updated = [...questions];
//         updated[i].options.push("");
//         setQuestions(updated);
//     };

//     const removeOpt = (i) => {
//         const updated = [...questions];
//         updated[i].options.splice(i, 1);
//         setQuestions(updated);
//     }

//     const handleQuestionChange = (i, value) => {
//         const updated = [...questions];
//         updated[i].question = value;
//         setQuestions(updated);
//     };

//     const handleOptionChange = (i, j, value) => {
//         const updated = [...questions];
//         updated[i].options[j] = value;
//         setQuestions(updated);
//     };

//     const handleAnswerChange = (i, value) => {
//         const updated = [...questions];
//         updated[i].answer = value;
//         setQuestions(updated);
//     }

//     const handleSubmit = async (values) => {
//         console.log(values);

//         // if (Object.keys(updatedata).length > 0) {
//         //     await updataQuizContent()
//         //     // setUpdateData({});

//         // } else {
//         //     await addQuizContent();
//         // }

//     };




//     return (
//         <form onClick={(e) => handleSubmit(questions)}>
//             {questions.map((v, i) => (
//                 <div key={i} style={{ marginBottom: "20px" }}>
//                     <TextField
//                         label="Question"
//                         value={v.question}
//                         onChange={(e) =>
//                             handleQuestionChange(i, e.target.value)
//                         }
//                         fullWidth
//                     />

//                     {v.options.map((opt, j) => (
//                         <TextField
//                             key={j}
//                             label={`Option ${j + 1}`}
//                             value={opt}
//                             onChange={(e) =>
//                                 handleOptionChange(i, j, e.target.value)
//                             }
//                             fullWidth
//                             style={{ marginTop: "10px" }}
//                         />
//                     ))}

//                     <Button onClick={() => addOpt(i)}>
//                         Add Option
//                     </Button>
//                     <Button onClick={() => removeOpt(i)}>
//                         Remove Option
//                     </Button>

//                     <TextField
//                         label="Answer"
//                         value={v.answer}
//                         onChange={(e) =>
//                             handleAnswerChange(i, e.target.value)
//                         }
//                         fullWidth
//                     />


//                 </div>
//             ))}

//             <Button variant="contained" onClick={addQue}>
//                 Add Question
//             </Button>

//             <Button variant="contained" onClick={removeQue}>
//                 Remove Question
//             </Button>

//             <Stack direction="row" spacing={2} mt={2}>
//                 <Button type="submit" variant="contained">
//                     Save Question
//                 </Button>
//             </Stack>
//         </form>
//     );
// }

// export default QuizContent;