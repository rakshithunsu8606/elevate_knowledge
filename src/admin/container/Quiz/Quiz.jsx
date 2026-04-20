import React, { useState } from 'react';
import { useGetAllCourseQuery } from '../../../Redux/api/Course.Api';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import Textinput from '../../Componet/TextFiled/Textinput';
import { DataGrid } from '@mui/x-data-grid';
import { useGetAllSectionQuery } from '../../../Redux/api/Section.Api';
import { useAddQuizMutation, useDeleteQuizMutation, useGetAllQuizQuery, useUpdateQuizMutation } from '../../../Redux/api/Quiz.Api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router';

function Quiz(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const [course, setCourse] = useState('');
    // const [field, setFieldValue] = useState("course_id")

    console.log(course);

    // const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { data } = useGetAllCourseQuery();

    console.log("CourseAllData:", data?.data);
    // console.log("CourseAllError", error);


    const CourDropData = [{ value: '', label: '--Select Course--' }];

    console.log(CourDropData);


    data?.data?.filter((v) => {
        CourDropData.push({ value: v._id, label: v.name })
    })

    const { data: Section } = useGetAllSectionQuery();

    console.log(Section?.data);

    const SectionDropData = [{ value: '', label: '--Select Section--' }];

    console.log(SectionDropData);

    const Sectionss = Section?.data?.filter((v) => v.course_id === course)

    console.log(Sectionss);

    Sectionss?.map((v) => {
        SectionDropData.push({ value: v._id, label: v.name })
    })

    const { data: Quiz } = useGetAllQuizQuery();

    console.log("AlldataQuiz", Quiz);

    const [addQuiz] = useAddQuizMutation()

    const [updataQuiz] = useUpdateQuizMutation()

    const [deleteQuiz] = useDeleteQuizMutation()









    let QuizSchema = object({
        course_id: string(),
        Section_id: string().required(),
        name: string().required('Please Enter Name'),
        // question: string().required('Please Enter question'),
        // option: string().required('Please Enter Option'),
        // answer: string().required('Please Enter Answer')
    })

    const columns = [
        {
            field: 'course_id',
            headerName: 'Course',
            width: 130,
            renderCell: (params) => {
                const courseObj = data?.data?.find(
                    (v) => v._id === params.row.course_id
                );

                return courseObj ? courseObj.name : "null";
            }
        },
        {
            field: 'Section_id',
            headerName: 'Section',
            width: 130,
            renderCell: (params) => {
                const SectionObj = Section?.data?.find(
                    (v) => v._id === params.row.Section_id
                );

                return SectionObj ? SectionObj.name : "null";
            }
        },
        { field: 'name', headerName: 'name', width: 130 },
        // { field: 'question', headerName: 'Question', width: 130 },
        // { field: 'option', headerName: 'Option', width: 130 },
        // { field: 'answer', headerName: 'Answer', width: 130 },
        {
            field: 'Action', headerName: 'Action', width: 130,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete">
                        <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(params.row._id)} />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <EditIcon style={{ color: 'blue' }} onClick={() => handleEdit(params.row)} />
                    </IconButton>
                </Stack>
            )
        },
        {
            headerName: 'Quiz Content', width: 170, renderCell: (params) => (
                <div>
                    <button style={{ border: 'none', padding: 0 }}>
                        <NavLink
                            to={`/admin/QuizContent/${params.row._id}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '105px',
                                height: '40px',
                                marginTop: '4px',
                                textDecoration: 'none',
                                backgroundColor: 'rgb(97, 230, 10)',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontFamily: 'sans-serif',
                                borderRadius: '5px'
                            }}
                        >
                            Add Quiz
                        </NavLink>
                    </button>
                </div>
            )
        },

    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const handleSubmit = async (values) => {
        console.log("valuesaaa", values);


        if (Object.keys(update).length > 0) {
            console.log(values);

            await updataQuiz({ ...values, _id: update._id })
        } else {
            await addQuiz({ ...values, course_id: course })
            setCourse('')
        }


    }

    const handleDelete = async (id) => {
        console.log(id);

        deleteQuiz(id)

        // dispatch(DeleteCategory(id))
    }

    const handleEdit = async (val) => {
        console.log("val", val);

        // dispatch(UpdateUser(val))

        handleClickOpen();

        setUpdate(val)
    }

    return (
        <React.Fragment>
            <h1>Quiz</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={Object.keys(update).length > 0 ? update : {
                            course_id: '',
                            Section_id: '',
                            name: '',
                            // question: '',
                            // option: '',
                            // answer: '',
                        }}
                        validationSchema={QuizSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log(values);
                            handleSubmit(values)

                            resetForm()
                            handleClose()
                        }}

                    >
                        <Form id="subscription-form">

                            <Textinput
                                name="course_id"
                                id="course_id"
                                label="- -Select- -"
                                style={{ margin: '0', padding: '0' }}
                                select
                                sloatProps={{
                                    select: {
                                        native: true
                                    }
                                }}
                                value={course}
                                data={CourDropData}
                                onChange={(e) => {
                                    setCourse(e.target.value);
                                }}
                            />

                            <Textinput
                                name="Section_id"
                                id="Section_id"
                                label="- -Select- -"
                                style={{ margin: '0', padding: '0' }}
                                select
                                sloatProps={{
                                    select: {
                                        native: true
                                    }
                                }}
                                data={SectionDropData}
                            />


                            <Textinput
                                name='name'
                                id='name'
                                label='Name'
                            />

                            <button>
                                <NavLink to={`QuizContent/${course}`}>
                                    Add Your Question
                                </NavLink>
                            </button>

                            {/* <Textinput
                                name='question'
                                id='question'
                                label='Question'
                            />

                            <Textinput
                                name='option'
                                id='option'
                                label='Option'
                            />

                            <Textinput
                                name='answer'
                                id='answer'
                                label='Answer'
                            /> */}
                        </Form>

                    </Formik>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
            <DataGrid
                getRowId={(row) => row._id}
                rows={Quiz?.data || []}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </React.Fragment>
    );
}

export default Quiz;