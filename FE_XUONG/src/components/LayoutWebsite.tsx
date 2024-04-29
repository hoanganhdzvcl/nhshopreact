import React from "react";
import { Footer, Header, Services } from ".";
import { Outlet } from "react-router-dom";

const LayoutWebsite = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Services />
            <Footer />
        </>
    );
};

export default LayoutWebsite;
