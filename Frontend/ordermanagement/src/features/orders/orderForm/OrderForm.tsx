import React, {useState} from "react";
import { Order, Status } from "../../../graphql/generated/schema";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { formatDatePicker } from "../../../utils/DateFormatter";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import OMTextField from "../../../components/FormsUI/OmTextField";
import OmSelect from "../../../components/FormsUI/OmSelect";
import OmSubmitButton from "../../../components/FormsUI/OmSubmitButton";
import { Grid, Typography } from "@mui/material";
import OmDatePicker from "../../../components/FormsUI/OmDatePicker";
import OmCheckBox from "../../../components/FormsUI/OmCheckBox";
import status from '../../../data/status.json';


interface OrderFormProps {
    order: Order
}

const FORM_VALIDATION = yup.object().shape({
    orderDate : yup.date()
        .required('OrderDate is required'),
    description : yup.string()
        .required('Description is required'),
    depositAmount : yup.number()
        .required('DepositAmount is required'),
    email : yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    othetNotes: yup.string(),
    totalAmount : yup.number()
        .required('TotaltAmount is required'),
    isDelivery : yup.boolean(),
    status: yup.string()
});
export default function OrderForm({order} : OrderFormProps){
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const INITIAL_FORM_STATE = {
        id: order.id,
        cutomerId: order.customerId,
        orderDate: formatDatePicker(order.orderDate ?? new Date()),
        description : order.description || '',
        depositAmount: order.depositAmount || 0,
        otherNotes : order.otherNotes || "",
        totlalAmount: order.totalmount || 0,
        isDelivery : order.isDelivery || false,
        status: order.status || Status.Draft
    };

    function addOrUpdateOrderDetails(values: any){
        console.log(values)
    }

    return (
        <Container>
            <div>
                <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={FORM_VALIDATION}
                onSubmit={addOrUpdateOrderDetails}
                >
                    <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <OmSelect
                                name="status"
                                otherProps={{label: "Order Status"}}
                                options={status}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OmDatePicker
                                name="orderDate"
                                otherProps={{label: "Order Date"}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OMTextField
                                name="description"
                                otherProps={{label: "Description"}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OMTextField
                                name="otherNotes"
                                otherProps={{
                                    label: "Other Notes",
                                    multiline: true,
                                    rows: 4
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Pricing Information</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <OMTextField
                                name="totlalAmount"
                                otherProps={{label: "Total Amount"}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OMTextField
                                name="depositAmount"
                                otherProps={{label: "Deposit Amount"}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OmCheckBox
                                name="isDelivery"
                                legend="Include Delivery"
                                label="Include Delivery"
                                otherProps={{label: "Delivery Included"}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                                <OmSubmitButton
                                    otherProps={{}}>
                                    {!order.id ? "Add New Order": "Update Order"}
                                </OmSubmitButton>
                            </Grid>
                    </Grid>
                    </Form>
                </Formik>
            </div>
        </Container>
    );
}