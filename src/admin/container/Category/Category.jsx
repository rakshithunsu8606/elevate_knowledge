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
import { mixed, object, string } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Stack } from '@mui/material';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCategory, addCategory, getAllCategory, UpdateCategory } from '../../../Redux/Slice/CategorySlice';
import { IMAGE_URL } from '../../../../utility/url';

function Catogary(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([])
    const [update, setUpdate] = useState({})

    const CategoryData = useSelector(state => state.Category)

    console.log(CategoryData.category);

    const CateDropData = [{ value: '', label: '--Select Category--' }];

    console.log(CateDropData);

    CategoryData.category?.map((v) => {
        console.log(v);

        CateDropData.push({ value: v._id, label: v.name })
    })



    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getData = () => {

        dispatch(getAllCategory())


    }

    useEffect(() => {
        getData();
    }, [])



    const handleSubmit = async (values) => {
        console.log(values);



        // console.log({ ...values, Profile_pic: values.Profile_pic.name });

        if (Object.keys(update).length > 0) {

            if (typeof values.category_img === 'object') {
                dispatch(UpdateCategory(values))
            } else {
                dispatch(UpdateCategory(values))
            }
        } else {
            console.log("handleSubmit", values);

            dispatch(addCategory(values))
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


        dispatch(DeleteCategory(id))
    }

    const handleEdit = async (val) => {
        console.log(val);

        // dispatch(UpdateUser(val))

        handleClickOpen();

        setUpdate(val)
    }



    const columns = [
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'description', headerName: 'description', width: 130 },
        {
            field: 'category_img', headerName: 'category_img', width: 130,
            renderCell: (params) => (

                // <img src={IMAGE_URL + params.row.category_img} width={'50px'} height={'50px'} />
                <img src={params.row.category_img.url} width={'50px'} height={'50px'} />
            )
        },
        {
            field: 'parent_category_id',
            headerName: 'parentCategory',
            width: 130,
            renderCell: (params) => {
                const categoryObj = CategoryData.category?.find(
                    (v) => v._id === params.row.parent_category_id
                );

                return categoryObj ? categoryObj.name : "null";
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


    let userSchema = object({
        name: string().required('Please Enter Name'),
        description: string().required('Please Enter Description'),
        category_img: mixed().required('Please Enter Picture'),
    })

    console.log(CategoryData.category);


    return (
        <>

            <h1>Category</h1>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Catogary
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Catogary</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(update).length > 0 ? update : {
                                name: '',
                                description: '',
                                category_img: null,
                                parent_category_id: null
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
                                    name="parent_category_id"
                                    id="parent_category_id"
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

                                <File
                                    name="category_img"
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
                    rows={CategoryData.category || []}
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

export default Catogary;