import React from "react";

export default function PrimaryButton({
    type = "submit",
    className = "",
    processing,
    children,
}) {
    return (
        <button
            type={type}
            className={
                `p-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
