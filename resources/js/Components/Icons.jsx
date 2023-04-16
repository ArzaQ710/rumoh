import React from "react";
import ArrowLeft from "./Icons/ArrowLeft";
import ArrowRight from "./Icons/ArrowRight";
import Close from "./Icons/Close";
import Instagram from "./Icons/Instagram";
import Twitter from "./Icons/Twitter";
import Navigation from "./Icons/Navigation";

const variants = {
    instagram: <Instagram></Instagram>,
    twitter: <Twitter></Twitter>,
    close: <Close></Close>,
    arrowRight: <ArrowRight />,
    arrowLeft: <ArrowLeft />,
};

function Icons({ variant, ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {variants[variant]}
        </svg>
    );
}

export default Icons;
