import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { useField } from 'formik';

function SwitchInput({ label, display, ...props }) {
    const [field, meta] = useField(props)



    console.log("field", field);
    console.log("meta", meta);
    console.log("Props", props);
    return (
        <>
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                {...field}
                                checked={field.value}
                            />
                        }
                        label={display}
                    />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>

            {
                meta.error && meta.touched ?
                    <FormHelperText style={{ color: 'red' }}>{meta.error}</FormHelperText>
                    : ''
            }

        </>
    );
}

export default SwitchInput;