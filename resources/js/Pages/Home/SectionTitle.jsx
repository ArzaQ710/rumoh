import React from "react";

const SectionTitle = ({ children, className }) => {
    return (
        <div className="">
            <h2
                className={
                    "text-center md:text-start font-bold text-2xl " + className
                }
                style={{ color: "rgb(45 170 195)" }}
            >
                {children}
            </h2>
        </div>
    );
};

export default SectionTitle;
