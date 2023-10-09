import React, { useState } from "react";
import { Address, Customer } from "../../../graphql/generated/schema";
import OmGrid from "../../../components/elements/OMGrid";
interface CustomerListProps {
    customers: Customer[];
}
export default function CustomerList({customers} : CustomerListProps){
    const [columnDefs] = useState([
        {
            field : 'id',
            width: 50,
            suppressSizeToFit: true,
        },
        {field: 'firstName'},
        {field: 'lastName'},
        {field: 'contactNumber'},
        {field: 'email'},
        {
            field: 'address',
            cellRenderer: function(params: any) {
                const address = params.value as Address
                return address.adressLine1
                    + ',' + address.adressLine2
                    + ',' + address.city
                    + ',' + address.state
                    + ',' + address.country
            }
        }
    ]);


    return (
        <OmGrid coloumnsDefs={columnDefs} rowData={customers} />
    )
}