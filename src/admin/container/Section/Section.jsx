import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik } from 'formik';
import { mixed, object, string } from 'yup';
import Textinput from '../../Componet/TextFiled/Textinput';
import File from '../../Componet/FileUpload/File';
import { DataGrid } from '@mui/x-data-grid';
import { data } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// import { addCategory, DeleteCategory, EditeCategory, getCategory } from '../../../Redux/Slice/SubCategory_Slice';
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { DeleteUser, fetchUser, getAllCategory, UpdateUser } from '../../../Redux/Slice/CategorySlice';
// import { addSubCategory, DeleteSubCategory, EditSubCategory, getSubCategory } from '../../../Redux/Slice/SubCategory_Slice';
import { getAllCategory } from '../../../Redux/Slice/CategorySlice';
import { useGetAllCourseQuery } from '../../../Redux/api/Course.Api';
import { useAddSectionMutation, useDeleteSectionMutation, useGetAllSectionQuery, useUpdateSectionMutation } from '../../../Redux/api/Section.Api';


function Section(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({})

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const CategoryData = useSelector(state => state.Category)
    // const Subcategory = useSelector(state => state.SubCategory)

    // console.log(CategoryData.category);

    const { data } = useGetAllCourseQuery();

    console.log("CourseAllData:", data);
    // console.log("CourseAllError", error);


    const CourDropData = [{ value: '', label: '--Select Course--' }];

    console.log(CourDropData);


    data?.data?.filter((v) => {
        CourDropData.push({ value: v._id, label: v.name })
    })


    const { data: Section } = useGetAllSectionQuery();

    console.log("AlldataSection", Section);

    const [addSection] = useAddSectionMutation()

    const [updataSection] = useUpdateSectionMutation()

    const [deleteSection] = useDeleteSectionMutation()



    const handleSubmit = async (values) => {
        console.log("valuesaaa", values);


        if (Object.keys(update).length > 0) {
            console.log(values);

            await updataSection({ ...values, _id: update._id })
        } else {
            await addSection(values)
        }


    }

    const handleDelete = async (id) => {
        console.log(id);

        deleteSection(id)

        // dispatch(DeleteCategory(id))
    }

    const handleEdit = async (val) => {
        console.log("val", val);

        // dispatch(UpdateUser(val))

        handleClickOpen();

        setUpdate(val)
    }



    // const handlechange = (value) => {
    //     console.log(value);

    //     activeCourse(value)
    // }



    const columns = [
        {
            field: 'course_id',
            headerName: 'parentCategory',
            width: 130,
            renderCell: (params) => {
                const courseObj = data?.data?.find(
                    (v) => v._id === params.row.course_id
                );

                return courseObj ? courseObj.name : "null";
            }
        },
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'description', headerName: 'description', width: 130 },
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



    let userSchema = object({
        course_id: string().required(),
        name: string().required('Please Enter Name'),
        description: string().required('Please Enter Description'),
    })

    return (
        <>
            <h1>Section</h1>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(update).length > 0 ? update : {
                                course_id: '',
                                name: '',
                                description: '',
                            }}
                            validationSchema={userSchema}
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
                                    data={CourDropData}
                                />


                                <Textinput
                                    name='name'
                                    id='name'
                                    label='Name'
                                />

                                <Textinput
                                    name='description'
                                    id='description'
                                    label='Description'
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
                    rows={Section?.data || []}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </React.Fragment>
        </>
    );
}

export default Section;