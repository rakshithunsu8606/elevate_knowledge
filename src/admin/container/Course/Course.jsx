import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import File from '../../Componet/FileUpload/File';
import { Form, Formik } from 'formik';
import Textinput from '../../Componet/TextFiled/Textinput';
import { boolean, mixed, number, object, string } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack, Switch } from '@mui/material';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../../utility/url';
import { getAllCategory } from '../../../Redux/Slice/CategorySlice';
import { useActiveCourseMutation, useAddCourseMutation, useDeleteCourseMutation, useGetAllCourseQuery, useUpdateCourseMutation } from '../../../Redux/api/Course.Api';
import SwitchInput from '../../Componet/SwitchInput/SwitchInput';
import { CheakAuthUser, Registration } from '../../../Redux/Slice/auth';
// import SwitchInput from '../../Componet/SwitchInput/SwitchInput';

function Course(props) {

    // console.log("props:",props);

    const [open, setOpen] = React.useState(false);
    // const [data, setData] = useState([])
    const [update, setUpdate] = useState({})

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(CheakAuthUser())
    }, [])

    const CategoryData = useSelector(state => state.Category)

    console.log(CategoryData.category);

    const Auth = useSelector(state => state.Auth)

    console.log("Auth:", Auth);

    const CateDropData = [{ value: '', label: '--Select Category--' }];

    console.log(CateDropData);

    CategoryData.category?.forEach((v) => {
        // console.log(v);

        CateDropData.push({ value: v._id, label: v.name })
    })



    const { data, error, isLoading } = useGetAllCourseQuery();

    console.log(data);

    const [addCourse] = useAddCourseMutation()

    const [updataCourse] = useUpdateCourseMutation()

    const [deleteCourse] = useDeleteCourseMutation()

    const [activeCourse] = useActiveCourseMutation()


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };






    const handleSubmit = async (values) => {
        console.log("valuesaaa", values);
        const formData = new FormData();

        formData.append('category_id', values.category_id);
        formData.append("name", values.name);
        formData.append("description", values.description);
        // formData.append("course_img", values.course_img);
        formData.append("price", values.price)
        formData.append("week", values.week)
        // formData.append("course_video", values.course_video)
        formData.append("instructure_id", Auth.user._id)

        const course_imgs = values.course_img.forEach(v => {
            formData.append('course_img', v);
        });

        // console.log("course_imgs:",course_imgs);


        // console.log({ ...values, Profile_pic: values.Profile_pic.name });

        if (Object.keys(update).length > 0) {
            formData.append("_id", values._id);

            updataCourse(values)

            if (typeof values.course_img === 'object') {

                updataCourse(formData)
            } else {
                updataCourse(formData)
            }
        } else {
            console.log("handleSubmit", values);

            addCourse(formData)
        }



        // if (Object.keys(update).length > 0) {
        //     try {
        //         const response = await fetch(`http://localhost:3000/category/${data.id}`, {
        //             method: "PUT",
        //             body: JSON.stringify(values),
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         });

        //         const data = await response.json()

        //         console.log(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } else {
        //     try {
        //         const response = await fetch('http://localhost:3000/category', {
        //             method: "POST",
        //             body: JSON.stringify(values),
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //         });

        //         const data1 = await response.json()

        //         console.log(data);

        //         const index = data.findIndex((v) => v.id === data.id)

        //         console.log(index);

        //         const Up = [...data]

        //         Up[index]=data1

        //         setData(data1)

        //     } catch (error) {
        //         console.log(error);

        //     }

        // }

    }

    const handleDelete = async (id) => {
        console.log(id);

        deleteCourse(id)

        // dispatch(DeleteCategory(id))
    }

    const handleEdit = async (val) => {
        console.log("val",val);

        // dispatch(UpdateUser(val))

        handleClickOpen();

        setUpdate(val)
    }

    const handlechange = (value) => {
        console.log(value);

        activeCourse(value)
    }







    const columns = [
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'description', headerName: 'description', width: 130 },
        {
            field: 'instructure_id',
            headerName: 'Instructure_id',
            width: 130,
        },
        {
            field: 'price', headerName: 'Price', width: 130,
        },
        {
            field: 'week', headerName: 'Week', width: 130
        },
        {
            field: 'course_img', headerName: 'course_img', width: 130,
            renderCell: (params) => (

                // <img src={params.row.course_img?.includes("blob") ?
                //     params.row.course_img :
                //     IMAGE_URL + params.row.course_img} width={'50px'} height={'50px'} />

                <div>
                    {
                        params.row.course_img?.map((v) => (
                            <img src={v.url} width={'50px'} height={'50px'} />
                        ))
                    }
                </div>

                // <img src={params.row.course_img?.url} width={'50px'} height={'50px'} />


            )
        },
        // {
        //     field: 'course_video',
        //     headerName: 'Course_Video',
        //     width: 130,
        //     renderCell: (params) => (

        //         // <img src={params.row.course_img?.includes("blob") ?
        //         //     params.row.course_img :
        //         //     IMAGE_URL + params.row.course_img} width={'50px'} height={'50px'} />

        //         <img src={params.row.course_video?.url} width={'50px'} height={'50px'} />

        //     )
        // },
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
            field: 'switch',
            headerName: 'switch',
            width: 130,
            renderCell: (params) => (
                <Switch
                    // checked={params.row.switch}
                    onChange={() => handlechange(params.row)}
                />
            )
        }



    ];

    const paginationModel = { page: 0, pageSize: 5 };


    let userSchema = object({
        category_id: string().required('Please Enter The Category'),
        name: string().required('Please Enter Name'),
        description: string().required('Please Enter Description'),
        course_img: mixed().required('Please Enter Picture'),
        price: number().required('Please Enter The Price'),
        week: string().required('Please Enter The Week'),
        // course_video: mixed().required('Please Enter Video')

        // switch: boolean().oneOf([true], "Please Switch On")
    })

    console.log(CategoryData.category);


    return (
        <>

            <h1>Course</h1>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Course
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Course</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(update).length > 0 ? update : {
                                name: '',
                                description: '',
                                course_img: null,
                                category_id: '',
                                price: '',
                                week: '',
                                // course_video: null
                                // switch: false,
                            }}
                            validationSchema={userSchema}
                            onSubmit={(values, { resetForm }) => {
                                console.log("valuesaaaax", values);
                                handleSubmit(values)

                                resetForm()
                                handleClose()
                            }}

                        >
                            <Form id="subscription-form">

                                <Textinput
                                    name="category_id"
                                    id="category_id"
                                    label="- -Select- -"
                                    style={{ margin: '0', padding: '0' }}
                                    select
                                    data={CateDropData}
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

                                <Textinput
                                    name='price'
                                    id='price'
                                    label='Price'
                                />

                                <Textinput
                                    name='week'
                                    id='week'
                                    label='Week'
                                />

                                <File
                                    name="course_img"
                                    type="img"
                                />

                                {/* <File
                                    name="course_video"
                                /> */}

                                {/* <SwitchInput
                                    name="switch"
                                    display="On/Off"
                                    label="Switch"
                                /> */}

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" form="subscription-form">
                                        Subscribe
                                    </Button>
                                </DialogActions>

                            </Form>
                        </Formik>
                    </DialogContent>

                </Dialog>
                <DataGrid
                    rows={data?.data}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    getRowId={(row) => row._id}
                />
            </React.Fragment >


        </>
    );
}

export default Course;