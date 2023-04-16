import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const Carousel = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = () => {
        Inertia.visit(route("cari"), {
            method: "get",
            data: {
                data: JSON.stringify({
                    sq: searchQuery,
                    sort: {
                        by: "price",
                        method: "asc",
                    },
                    filters: { where: [], orWhere: [] },
                }),
            },
            onSuccess: () => {
                window.history.replaceState({}, "Cari", "/cari");
            },
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div
            id="carousel"
            className="h-screen flex flex-col justify-center px-4 md:px-24"
        >
            <h1 className="font-bold text-3xl md:text-7xl">
                Miliki Propertimu Sekarang Dengan Rumoh.id
            </h1>
            <div className="flex items-center bg-white grow-0 w-full md:w-fit p-3 mt-16 rounded-3xl">
                <input
                    value={searchQuery}
                    type="text"
                    id="carousel-search"
                    placeholder="Cari Desa, Kecamatan, Kabupaten/Kota, Provinsi"
                    className="shadow-none__input mr-3 border-0 text-2xl rounded-3xl w-full"
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button
                    className="bg-slate-900 text-white p-4 rounded-3xl"
                    onClick={handleSubmit}
                >
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
                        className="feather feather-search w-6 h-6 md:w-12 md:h-12"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
