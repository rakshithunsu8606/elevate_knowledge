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
import { addSubCategory, DeleteSubCategory, EditSubCategory, getSubCategory } from '../../../Redux/Slice/SubCategory_Slice';
import { getAllCategory } from '../../../Redux/Slice/CategorySlice';


function Sub_Category(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({})

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CategoryData = useSelector(state => state.Category)
    const Subcategory = useSelector(state => state.SubCategory)

    console.log(CategoryData.category);

    const CateDropData = [{ value: '', label: '--Select Category--' }];

    console.log(CateDropData);

    CategoryData.category.map((v) => {
        CateDropData.push({ value: v.id, label: v.name })
    })

    const getData = () => {

        dispatch(getSubCategory())

    }

    useEffect(() => {
        getData();
        dispatch(getAllCategory())
    }, [])


    const handleSubmit = (values) => {
        console.log(values);

        console.log({ ...values, SubCategory_img: values.SubCategory_img.name });

        if (Object.keys(update).length > 0) {
            if (typeof values.SubCategory_img === 'object') {
                dispatch(EditSubCategory({ ...values, SubCategory_img: values.SubCategory_img.name }))
            } else {
                dispatch(EditSubCategory(values))
            }
        } else {
            dispatch(addSubCategory({ ...values, SubCategory_img: values.SubCategory_img.name }))
        }
 
    }

    const handleDelete = (id) => {
        console.log(id);

        dispatch(DeleteSubCategory(id))

    }

    const handleEdit = (data) => {
        console.log(data);

        setUpdate(data)

        handleClickOpen();


    }



    const columns = [
        {
            field: 'category',
            headerName: 'Category',
            width: 130,
            renderCell: (params) => {
                const c = CategoryData.category.find((v) => v.id === params.row.category)

                console.log(c);

                return c?.name
            }

        },
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'description', headerName: 'description', width: 130 },
        {
            field: 'SubCategory_img', headerName: 'SubCategory_img', width: 130,
            renderCell: (params) => (

                <img src={'/public/assets/images/courses/4by3/' + params.row.SubCategory_img} width={'50px'} height={'50px'} />
            )
        },
        {
            field: 'Action', headerName: 'Action', width: 130,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="delete">
                        <DeleteIcon style={{ color: 'red' }} onClick={() => handleDelete(params.row.id)} />
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
        category: string().required(),
        name: string().required('Please Enter Name'),
        description: string().required('Please Enter Description'),
        SubCategory_img: mixed().required('Please Enter Picture')

    })

    return (
        <>
            <h1>Sub_Category</h1>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(update).length > 0 ? update : {
                                category: '',
                                name: '',
                                description: '',
                                SubCategory_img: null
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
                                    name="category"
                                    id="category"
                                    select
                                    label="Category"
                                    data={CateDropData}
                                    defaultValue="EUR"
                                    slotProps={{
                                        select: {
                                            native: true,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    name="SubCategory_img"
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
                    rows={Subcategory.SubCategory}
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

export default Sub_Category;