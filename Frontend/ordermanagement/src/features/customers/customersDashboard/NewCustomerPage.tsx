import React from "react";
import { Customer } from "../../../graphql/generated/schema";
import { Container, Grid } from "@mui/material";
import OmHeader from "../../../components/elements/OMHeader";
import CustomerForm from "../customerForms/customerForm";

export default function NewCustomerPage(){
    const customer = {} as Customer;

    return (
        <Container>
            <Grid item spacing={12}>
                <Grid item xs={12}>
                    <OmHeader header={"New Customer Details"} />
                </Grid>
                <Grid item xs={12}>
                    <CustomerForm customer={customer} />
                </Grid>
            </Grid>
        </Container>
    );
}