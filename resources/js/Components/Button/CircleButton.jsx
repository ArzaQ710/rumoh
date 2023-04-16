import React from "react";

const CircleButton = ({ children, className = "", ...props }) => {
    return (
        <button
            className={
                "shadow bg-white flex justify-center items-center rounded-full p-2 " +
                className
            }
            style={{ width: "44px", height: "44px" }}
            {...props}
        >
            {children}
        </button>
    );
};

export default CircleButton;
