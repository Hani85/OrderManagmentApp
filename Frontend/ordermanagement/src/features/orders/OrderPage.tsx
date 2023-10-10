import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer, Order, useGetOrderByIdQuery } from "../../graphql/generated/schema";
import OmLoading from "../../components/elements/OMLoading";
import OmAlert from "../../components/elements/OMAlert";
import OrderForm from "./orderForm/OrderForm";
import {Container} from '@mui/system';
import { Grid } from "@mui/material";
import OmHeader from "../../components/elements/OMHeader";

export default function Orderpage(){
    const params = useParams();
    const orderId = parseInt(params.orderId || '0');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { data: orderData, loading: orderLoading, error: orderError} = useGetOrderByIdQuery({
        variables: {
            id: orderId
        }
    });

    if (orderLoading) {
        return <OmLoading />
    }
    if(orderError || !orderData || !orderData.orders){
        return <OmAlert message="Error retrieving customer data" />
    }

    const order = orderData.orders[0] as Order;
    const customer = order.customer as Customer;

    return (
        <Container>
        <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <OmHeader header= {`Order Details - ${customer.firstName} ${customer.lastName}`} />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={12}>
                <OrderForm order={order} />
            </Grid>
        </Grid>
    </Container>
    );

}