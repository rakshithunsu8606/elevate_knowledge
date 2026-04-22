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




    const AllQuizContent_Data = QuizContent?.data?.filter((v) => v.quiz_id === id)

    console.log(AllQuizContent_Data);

    const handleDelete = async (id) => {
        console.log(id);
        deleteQuizContent(id);
    }



    const handlEdit = (val) => {

        console.log(val);

        setUpdateData({
            _id: val._id,
            question: val.question,
            option1: val.option?.[0] || "",
            option2: val.option?.[1] || "",
            option3: val.option?.[2] || "",
            option4: val.option?.[3] || "",
            answer: val.answer || "",
            mark: val.mark || ""
        });

    }

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
                answer: values.answer,
                mark: values.mark
            })
            setUpdateData({});

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
                answer: values.answer,
                mark: values.mark
            });
        }

    };

    return (
        <div>
            <h2>Quiz Content</h2>

            <Formik
                enableReinitialize
                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                    question: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    answer: '',
                    mark: '',
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

                    {/* <Textinput
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
                    /> */}

                    <Textinput name="answer" label="Answer" />
                    <Textinput name="mark" label="Marks" />


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
                        <p><strong>Marks:</strong> {v.mark}</p>

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


