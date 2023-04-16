import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";
import Header from "@/Pages/Home/Header";
import Footer from "@/Pages/Home/Footer";

export default function Guest({ children }) {
    return (
        <div>
            <Header></Header>

            <div>{children}</div>

            <Footer></Footer>
        </div>
    );
}
