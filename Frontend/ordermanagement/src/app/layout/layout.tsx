import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "./nav/navbar";
import { Container } from "@mui/material";

export default function Layout(){
    return (
        <>
            <Navbar/>
            <Container
                sx={{ p: '2rem'}}>
                    <Outlet/>
                </Container>
        </>
    )
}