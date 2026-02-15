import React from 'react';
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

function Catogary(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let userSchema = object({
        name: string().required('Please Enter Name'),
        description: string().required('Please Enter Description'),
        Picture: mixed().required('Please Enter Picture')
    })
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

                            initialValues={{
                                name: '',
                                description: 'red',
                                Picture: null,
                            }}
                            validationSchema={userSchema}
                            onSubmit={(values) => {
                                console.log(values);

                            }}
                        />
                        <Form id="subscription-form">
                            <Textinput
                                name='name'
                                id='name'
                                lable='Name'
                            />

                            <Textinput
                                name='description'
                                id='description'
                                lable='Description'
                            />

                            <File
                                name="Picture" type="file"
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
        </React.Fragment >
        </>
    );
}

export default Catogary;