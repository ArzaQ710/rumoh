import React from "react";

function Button({ className, children, ...props }) {
    return (
        <button
            className={`shadow flex justify-center items-center rounded-full p-2 ${className}`}
            style={{ width: "44px", height: "44px" }}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
