import { Typography } from "@mui/material";
import React from "react";
import { string } from "yup";

interface OmHeaderProps {
    header: string;
}

export default function OmHeader({header} : OmHeaderProps){
    return (
    <Typography component='div' variant='h5' display='block' gutterBottom align='center'>
        {header}
    </Typography>
    );
}