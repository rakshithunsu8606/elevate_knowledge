import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

function CheakInput_Box({ label, display, ...props }) {

    const [field, meta] = useField(props);

    console.log(field);
    console.log(meta);
    
    

    return (

        <>
            <FormControlLabel
                control={

                    <Checkbox
                        {...field}
                        checked={field.value}

                    />
                }

                label={label}
            />

            {
                meta.error && meta.touched ?
                    <p style={{ color: 'red' }}>{meta.error}</p> : ''
            }
        </>
    );
}

export default CheakInput_Box;