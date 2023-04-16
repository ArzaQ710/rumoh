import React from "react";
import InputError from "./InputError";

const Input = ({ children, message, ...props }) => {
    return (
        <div {...props}>
            {children}
            <InputError message={message} className="mt-2 ml-4" />
        </div>
    );
};

export default Input;
