import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface OmDatePickerProps{
    name: string,
    otherProps: any
}
export default function OmDatePicker({name, otherProps} : OmDatePickerProps){
    const [field, meta] = useField(name);

    const configDatePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        fullWidth: true,
        variant: 'outlined',
        InputLabelProps: {
            shrink: true
        }
    };

    if(meta && meta.touched && meta.error){
        configDatePicker.error = true;
        configDatePicker.helpertext = meta.error;
    }

    return (
        <TextField {...configDatePicker} />
    );

}