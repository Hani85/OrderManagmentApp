import React, { useState } from "react";
import { Customer } from "../../../graphql/generated/schema";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import {Container} from '@mui/system';
import { Form, Formik } from "formik";
import { Grid, Typography } from "@mui/material";
import OMTextField from "../../../components/FormsUI/OmTextField";
import OmSelect from "../../../components/FormsUI/OmSelect";
import OmSubmitButton from "../../../components/FormsUI/OmSubmitButton";
import countries from '../../../data/countries.json';

interface CustomerFormProps {
    customer: Customer,
}

const FORM_VALIDATION = yup.object().shape({
    firstName : yup.string()
        .required('First name is required'),
    lastname : yup.string()
        .required('Last name is required'),
    contactNumber : yup.string()
        .required('contact number is required'),
    email : yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    addressLine1: yup.string()
        .required('Address line is required'),
    addressLine2: yup.string(),
    city : yup.string()
        .required('City is required'),
    state : yup.string()
        .required('State is required'),
    country : yup.string()
        .required('Country is required'),

});
export default function CustomerForm({customer}: CustomerFormProps){
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const INITIAL_FORM_STATE = {
        id: customer.id,
        firstName: customer.firstName,
        lastName : customer.lastName,
        contactNumber: customer.contactNumber,
        email : customer.email,
        adressLine1: customer.address?.adressLine1 || '',
        adressLine2: customer.address?.adressLine2 || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        country: customer.address?.country || ''
    };

    function addOrUpdateCustomerDetails(values: any){
        console.log(values)
    }

    return (
        <Container>
            <div>
                <Formik
                    initialValues={INITIAL_FORM_STATE}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={addOrUpdateCustomerDetails}
                    ><Form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="firstName"
                                    otherProps={{label: "First Name"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="lastName"
                                    otherProps={{label: "Last Name"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="email"
                                    otherProps={{label: "Email"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="contactNumber"
                                    otherProps={{label: "Contact Number"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Address</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="adressLine1"
                                    otherProps={{label: "Address Line 1"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OMTextField
                                    name="adressLine2"
                                    otherProps={{label: "Address Line 2"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="city"
                                    otherProps={{label: "City"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OMTextField
                                    name="state"
                                    otherProps={{label: "State"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OmSelect
                                    name="country"
                                    otherProps={{label: "Country"}}
                                    options= {countries}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <OmSubmitButton
                                    otherProps={{}}>
                                    {!customer.id ? "Add New Customer": "Update Customer"}
                                </OmSubmitButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>    
            </div>
        </Container>
    )
}