import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useField } from 'formik';


function RadioFiled({ data, label, ...props }) {
    const [field, meta] = useField(props)



    console.log("field", field);
    console.log("meta", meta);
    console.log("Props", props);
    return (
        
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    {...field}
                    aria-labelledby="demo-radio-buttons-group-label"
                >

                    {
                        data.map((v) => (
                            <FormControlLabel value={v.value} control={<Radio />} label={v.label} />
                        ))
                    }
                </RadioGroup>
                {
                meta.error && meta.touched ?
                    <p style={{ color: 'red' }}>{meta.error}</p> : ''
            }
            </FormControl>
         
    );
}

export default RadioFiled;