import { Alert, Box } from "@mui/material";
import React from "react";

interface OmALertProps {
    message: string;
}

export default function OmAlert({message}: OmALertProps){
    return (
        <Box sx={{display: 'flex'}}>
        <Alert severity="error">{message}</Alert>
        </Box>
    );
}