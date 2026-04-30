import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { mixed, object, string } from 'yup';
import Textinput from '../../Componet/TextFiled/Textinput';
import File from '../../Componet/FileUpload/File';
import { useGetAllCourseQuery } from '../../../Redux/api/Course.Api';
import { useGetAllSectionQuery } from '../../../Redux/api/Section.Api';
import { useAddContentMutation, useDeleteContentMutation, useGetAllContentQuery, useUpdateContentMutation } from '../../../Redux/api/Content.Api';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Content(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const [course, setCourse] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Course Drop
    const { data } = useGetAllCourseQuery();

    console.log("CourseAllData:", data?.data);


    const CourDropData = [{ value: '', label: '--Select Course--' }];

    console.log(CourDropData);


    data?.data?.filter((v) => {
        CourDropData.push({ value: v._id, label: v.name })
    })

    //Section Drop 
    const { data: Section } = useGetAllSectionQuery();

    console.log(Section?.data);

    const SectionDropData = [{ value: '', label: '--Select Section--' }];

    console.log(SectionDropData);

    const Sectionss = Section?.data?.filter((v) => v.course_id === course)

    console.log(Sectionss);

    Sectionss?.map((v) => {
        SectionDropData.push({ value: v._id, label: v.name })
    })

    //Content
    const { data: Content } = useGetAllContentQuery();

    console.log(Content?.data);

    const [addContent] = useAddContentMutation()

    const [updataContent] = useUpdateContentMutation()

    const [deleteContent] = useDeleteContentMutation()






    let ContentSchema = object({
        course_id: string(),
        Section_id: string().required(),
        name: string().required('Please Enter Name'),
        order: string().required('Please Enter order'),
        video: mixed().required('Please Enter content_video'),
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
        { field: 'order', headerName: 'Order', width: 130 },
        {
            field: 'video',
            headerName: 'Video',
            width: 200,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {params.row.video?.map((v, i) => {
                            if (v.type === 'image') {
                                return (
                                    <img key={i} src={v.url} width="50" height="50" />
                                );
                            }
                            else if (v.type === 'video') {
                                return (
                                    <video key={i} src={v.url} controls width="50" height="50" />
                                );
                            }
                            else if (v.type === 'pdf') {
                                return (
                                    <a key={i} href={v.url} target="_blank" rel="noopener noreferrer">
                                        📄 PDF
                                    </a>
                                );
                            }
                            else {
                                return null;
                            }
                        })}
                    </div>
                );
            }
        },
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


    ];

    const paginationModel = { page: 0, pageSize: 5 };


    const handleDelete = async (id) => {
        console.log(id);

        deleteContent(id)

    }

    const handleEdit = async (val) => {
        console.log("val", val);



        handleClickOpen();

        setUpdate(val)

        setCourse(val.course_id);
    }

    const handleSubmit = async (values) => {
        console.log("valuesaaa", values);

        const formData = new FormData();


        formData.append("course_id", course);
        formData.append("Section_id", values.Section_id)
        formData.append("name", values.name);
        formData.append("order", values.order)

        console.log("formdataa", Object.fromEntries(formData.entries()));



        values?.video?.forEach((v) => {
            if (v instanceof window.File) {
                formData.append('video', v);
            } else {
                formData.append('video', v.url);
            }
        });

        if (Object.keys(update).length > 0) {
            console.log(values);

            formData.append("_id", values._id);

            console.log("formdataaaa", formData);

            setUpdate({})

            await updataContent(formData)
        } else {
            await addContent(formData)
            setCourse('')
        }


    }


    return (
        <React.Fragment>
            <h1>Content</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <Formik
                        enableReinitialize
                        initialValues={Object.keys(update).length > 0 ? update : {
                            course_id: '',
                            Section_id: '',
                            name: '',
                            order: '',
                            video: []
                        }}
                        validationSchema={ContentSchema}
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

                            <Textinput
                                name='order'
                                id='order'
                                label='Order'
                            />

                            <File
                                name="video"
                            />

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
                rows={Content?.data || []}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </React.Fragment>
    );
}

export default Content;