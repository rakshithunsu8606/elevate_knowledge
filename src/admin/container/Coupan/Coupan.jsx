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
import { IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAddCoupanMutation, useDeleteCoupanMutation, useGetAllCoupanQuery, useUpdateCoupanMutation } from '../../../Redux/api/Coupan.Api';


function Coupan(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({})

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    const { data: Coupon } = useGetAllCoupanQuery();

    console.log("AlldataCoupan", Coupon?.data);

    // console.log("AlldataCoupannn", isLoading);

    // console.log("AlldataCoupan ERROR", error);



    const [addCoupan] = useAddCoupanMutation()

    const [updataCoupan] = useUpdateCoupanMutation()

    const [deleteCoupan] = useDeleteCoupanMutation()


    const handleSubmit = async (values) => {
        console.log("valuesaaa", values);


        if (Object.keys(update).length > 0) {
            console.log(values);

            await updataCoupan({
                ...values,
                _id: update._id
            })
        } else {
            await addCoupan(values)
        }


    }

    const handleDelete = async (id) => {
        console.log(id);

        deleteCoupan(id)

    }

    const handleEdit = async (val) => {
        console.log("val", val);

        handleClickOpen();

        setUpdate({
            ...val,
            startDate: val.startDate?.split("T")[0],
            expiryDate: val.expiryDate?.split("T")[0]
        })
    }







    const columns = [
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        {
            field: 'startDate', headerName: 'StartDate', width: 130,
        },
        {
            field: 'expiryDate', headerName: 'expiryDate', width: 130,
        },
        {
            field: 'limit', headerName: 'Limit', width: 130,
        },
        {
            field: 'use', headerName: 'Use', width: 130,
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
        discount: string().required('Please Enter Discount'),
        name: string().required('Please Enter Name'),
        startDate: string().required('Please Enter StartDate'),
        expiryDate: string().required('Please Enter ExpiryDate'),
        limit: string().required('Please Enter Limit'),
    })

    return (
        <>
            <h1>Coupan</h1>

            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={Object.keys(update).length > 0 ? update : {
                                name: '',
                                discount: '',
                                startDate: '',
                                expiryDate: '',
                                limit: '',
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
                                    name='name'
                                    id='name'
                                    label='Name'
                                />

                                <Textinput
                                    name='discount'
                                    id='discount'
                                    label='Discount'
                                />

                                <Textinput
                                    type='Date'
                                    name='startDate'
                                    id='startDate'
                                    label='StartDate'
                                    sloatProps={{
                                        select: {
                                            native: true
                                        }
                                    }}
                                />

                                <Textinput
                                    type='Date'
                                    name='expiryDate'
                                    id='expiryDate'
                                    label='ExpiryDate'
                                    sloatProps={{
                                        select: {
                                            native: true
                                        }
                                    }}
                                />

                                <Textinput
                                    name='limit'
                                    id='limit'
                                    label='Limit'
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
                    rows={Coupon?.data || []}
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

export default Coupan;