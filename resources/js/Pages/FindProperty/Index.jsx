import PropertyCard from "@/Components/Card/PropertyCard";
import Modal from "@/Components/Modal";
import PropertyDetail from "@/Components/PropertyDetail";
import Guest from "@/Layouts/GuestLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Filter as FilterIcon, Search, X as CloseIcon } from "react-feather";
import Select from "react-select";
import sortAsc from "../../../images/sort-asc.png";
import sortDesc from "../../../images/sort-desc.png";
import Filter from "./Filter";

const numberOfBedroomOptions = [
    { value: [">=", 1], label: "Semua" },
    { value: ["=", 1], label: "1 kamar" },
    { value: ["=", 2], label: "2 kamar" },
    { value: ["=", 3], label: "3 kamar" },
    { value: ["=", 4], label: "4 kamar" },
    { value: ["=", 5], label: "5 kamar" },
    { value: [">", 5], label: "> 5 kamar" },
];

const statusOptions = [
    { value: ["=", "for sale"], label: "Dijual" },
    { value: ["=", "for rent"], label: "Disewakan" },
];

function Index({ properties, filterOptions, lastPage, ...props }) {
    const [allProperties, setAllProperties] = useState(properties);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedRegions, setSelectedRegions] = useState({
        villages: [],
        districts: [],
        regencies: [],
        provinces: [],
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState({
        by: "price",
        method: "asc",
    });
    const [priceRange, setPriceRange] = useState(["", ""]);
    const [numberOfBedoom, setNumberOfbedroom] = useState(null);
    const [status, setStatus] = useState({
        value: ["=", "for sale"],
        label: "Dijual",
    });
    const [page, setPage] = useState(1);

    const generateFilters = () => {
        const filters = { where: [], orWhere: [] };

        if (priceRange[0] !== "") {
            filters.where.push(["price", ">=", Number.parseInt(priceRange[0])]);
        }
        if (priceRange[1] !== "") {
            filters.where.push(["price", "<=", Number.parseInt(priceRange[1])]);
        }
        if (numberOfBedoom) {
            filters.where.push([
                "number_of_bedroom",
                numberOfBedoom.value[0],
                numberOfBedoom.value[1],
            ]);
        }
        if (searchQuery === "") {
            selectedRegions.villages.forEach((item) =>
                filters.orWhere.push(["village", "=", item.value])
            );
            selectedRegions.districts.forEach((item) =>
                filters.orWhere.push(["district", "=", item.value])
            );
            selectedRegions.regencies.forEach((item) =>
                filters.orWhere.push(["regency", "=", item.value])
            );
            selectedRegions.provinces.forEach((item) =>
                filters.orWhere.push(["province", "=", item.value])
            );
        }
        filters.where.push(["status", status.value[0], status.value[1]]);

        return filters;
    };

    const handleSubmit = () => {
        setIsOpen(false);

        const filters = generateFilters();

        Inertia.reload({
            only: ["properties", "lastPage"],
            data: {
                data: JSON.stringify({
                    sq: searchQuery,
                    sort,
                    filters,
                }),
            },
            onSuccess: (page) => {
                setAllProperties([...page.props.properties]);
                window.history.replaceState({}, "Cari", "/cari");
            },
        });

        setPage(1);
    };

    const handleChange = (selectedOptions, regionlevel) => {
        console.log(selectedOptions);
        setSearchQuery("");
        setSelectedRegions({
            ...selectedRegions,
            [regionlevel]: selectedOptions,
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleLoadMore = () => {
        const filters = generateFilters();
        Inertia.reload({
            only: ["properties"],
            data: {
                data: JSON.stringify({
                    sq: searchQuery,
                    sort,
                    filters,
                }),
                page: page + 1,
            },
            onSuccess: (page) => {
                setAllProperties([...allProperties, ...page.props.properties]);
                window.history.replaceState({}, "Cari", "/cari");
            },
        });
        setPage(page + 1);
    };

    window.onscroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >
                document.documentElement.offsetHeight - 100 &&
            page < lastPage
        ) {
            handleLoadMore();
        }
    };

    return (
        <Guest>
            <Head title="Cari Properti" />

            <div
                className="py-12 px-4 md:px-12 flex flex-col md:flex-row"
                style={{ backgroundColor: "rgb(244, 248, 252)" }}
            >
                <div className="md:w-52 shrink-0 flex md:flex-col">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden mr-2 flex flex-col items-center text-sm"
                    >
                        <FilterIcon />
                        Filter
                    </button>

                    {/* Search bar */}
                    <div className="md:w-full grow md:grow-0 relative">
                        <input
                            value={searchQuery}
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                                setSelectedRegions({
                                    villages: [],
                                    districts: [],
                                    regencies: [],
                                    provinces: [],
                                });
                            }}
                            type="text"
                            placeholder="Cari Desa, Kecamatan, Kabupaten/Kota, Provinsi"
                            className="w-full rounded-3xl border-0 focus:ring-0 px-4 py-2.5 shadow"
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            className="shadow rounded-3xl bg-slate-900 text-white p-2.5 absolute right-0 top-0"
                            onClick={() => handleSubmit()}
                        >
                            <Search />
                        </button>
                    </div>

                    {/* Status */}
                    <div className="hidden md:block mt-3">
                        <Select
                            value={status}
                            options={statusOptions}
                            className="w-full shadow rounded-3xl"
                            classNamePrefix="react-select"
                            placeholder="Jumlah Kamar"
                            onChange={(selected) => setStatus(selected)}
                        />
                    </div>

                    {/* Sort by price */}
                    <div
                        className="hidden mt-3 px-4 py-2 md:flex items-center bg-white shadow rounded-3xl cursor-pointer"
                        onClick={() => {
                            sort.method === "asc"
                                ? setSort({ by: "price", method: "desc" })
                                : setSort({ by: "price", method: "asc" });
                        }}
                    >
                        <div className="w-full cursor-pointer">Harga</div>
                        <img
                            src={sort.method === "asc" ? sortAsc : sortDesc}
                            className="h-6 w-8"
                        />
                    </div>

                    {/* Price range */}
                    <div className="hidden md:block mt-3">
                        <div className="flex items-center rounded-3xl shadow bg-white">
                            <div className="ml-4">Rp</div>
                            <input
                                value={
                                    priceRange[0] === ""
                                        ? priceRange[0]
                                        : Number.parseInt(
                                              priceRange[0].replaceAll(".", "")
                                          ).toLocaleString("id")
                                }
                                onChange={(event) =>
                                    setPriceRange([
                                        event.target.value.replaceAll(".", ""),
                                        priceRange[1],
                                    ])
                                }
                                type="text"
                                placeholder="Min"
                                className="border-0 ring-0 focus:ring-0 w-3/4 px-2"
                            />
                        </div>

                        <div className="flex items-center rounded-3xl shadow bg-white mt-3">
                            <div className="ml-4">Rp</div>
                            <input
                                value={
                                    priceRange[1] === ""
                                        ? priceRange[1]
                                        : Number.parseInt(
                                              priceRange[1].replaceAll(".", "")
                                          ).toLocaleString("id")
                                }
                                onChange={(event) =>
                                    setPriceRange([
                                        priceRange[0],
                                        event.target.value.replaceAll(".", ""),
                                    ])
                                }
                                type="text"
                                placeholder="Maks"
                                className="border-0 ring-0 focus:ring-0 w-3/4 px-2"
                            />
                        </div>
                    </div>

                    {/* Filter by room number */}
                    <div className="mt-3 hidden md:block">
                        <Select
                            value={numberOfBedoom}
                            options={numberOfBedroomOptions}
                            className="w-full shadow rounded-3xl"
                            classNamePrefix="react-select"
                            placeholder="Jumlah Kamar"
                            onChange={(selected) =>
                                setNumberOfbedroom(selected)
                            }
                        />
                    </div>

                    {/* Filter by regions */}
                    <Filter
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        selectedOptions={selectedRegions}
                        filterOptions={filterOptions}
                        className="hidden md:flex flex-col w-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-4 mt-4 md:mt-0 gap-4">
                    {allProperties.map((item) => (
                        <PropertyCard
                            {...item}
                            className="max-w-sm p-2 pb-3 h-fit"
                            key={`property-${item.id}`}
                            layoutId={item.id}
                            onClick={() => setSelectedId(item.id)}
                        ></PropertyCard>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedId && (
                        <PropertyDetail
                            selectedId={selectedId}
                            property={
                                properties.filter(
                                    (item) => item.id === selectedId
                                )[0]
                            }
                            closeHandler={() => setSelectedId(null)}
                        />
                    )}
                </AnimatePresence>
            </div>

            <Modal isOpen={isOpen}>
                <div className="bg-white rounded-3xl p-4">
                    <div className="flex justify-end mb-2">
                        <button onClick={() => setIsOpen(false)}>
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Status */}
                    <div className="mt-3">
                        <Select
                            value={status}
                            options={statusOptions}
                            className="w-full shadow rounded-3xl"
                            classNamePrefix="react-select"
                            placeholder="Jumlah Kamar"
                            onChange={(selected) => setStatus(selected)}
                        />
                    </div>

                    {/* Sort by price */}
                    <div
                        className="mt-3 px-4 py-2 flex items-center bg-white shadow rounded-3xl cursor-pointer"
                        onClick={() => {
                            sort.method === "asc"
                                ? setSort({ by: "price", method: "desc" })
                                : setSort({ by: "price", method: "asc" });
                        }}
                    >
                        <div className="w-full cursor-pointer">Harga</div>
                        <img
                            src={sort.method === "asc" ? sortAsc : sortDesc}
                            className="h-6 w-8"
                        />
                    </div>

                    {/* Price range */}
                    <div className="grid grid-cols-2 gap-x-2 mt-3">
                        <input
                            value={priceRange[0]}
                            onChange={(event) =>
                                setPriceRange([
                                    event.target.value,
                                    priceRange[1],
                                ])
                            }
                            type="number"
                            min={1}
                            placeholder="Min"
                            className="rounded-3xl border-0 ring-0 focus:ring-0 shadow"
                        />
                        <input
                            value={priceRange[1]}
                            onChange={(event) =>
                                setPriceRange([
                                    priceRange[0],
                                    event.target.value,
                                ])
                            }
                            type="number"
                            min={1}
                            placeholder="Maks"
                            className="rounded-3xl border-0 ring-0 focus:ring-0 shadow"
                        />
                    </div>

                    {/* Filter by room number */}
                    <div className="mt-3">
                        <Select
                            value={numberOfBedoom}
                            options={numberOfBedroomOptions}
                            className="w-full shadow rounded-3xl"
                            classNamePrefix="react-select"
                            placeholder="Jumlah Kamar"
                            onChange={(selected) =>
                                setNumberOfbedroom(selected)
                            }
                        />
                    </div>

                    <Filter
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        selectedOptions={selectedRegions}
                        filterOptions={filterOptions}
                    ></Filter>
                </div>
            </Modal>
        </Guest>
    );
}

export default Index;
