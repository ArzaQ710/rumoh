import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Select from "react-select";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const filters = [
    { option: "villages", placeholder: "Desa" },
    { option: "districts", placeholder: "Kecamatan" },
    { option: "regencies", placeholder: "Kabupaten" },
    { option: "provinces", placeholder: "Provinsi" },
];

function Filter({
    selectedOptions,
    filterOptions,
    className,
    handleSubmit,
    handleChange,
    ...props
}) {
    return (
        <div className={className}>
            {filters.map((item) => (
                <div className="mt-3" key={`filter-${item.option}`}>
                    <Select
                        isMulti
                        value={selectedOptions[item.option]}
                        options={filterOptions[item.option]}
                        className="w-full shadow rounded-3xl"
                        classNamePrefix="react-select"
                        placeholder={item.placeholder}
                        onChange={(selected) =>
                            handleChange(selected, item.option)
                        }
                    />
                </div>
            ))}

            <button
                className="shadow rounded-3xl mt-4 bg-slate-900 text-white p-2 w-full"
                onClick={() => handleSubmit()}
            >
                TERAPKAN
            </button>
        </div>
    );
}

export default Filter;
