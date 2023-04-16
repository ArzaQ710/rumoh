import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import { Plus as PlusIcon } from "react-feather";
import CircleButton from "@/Components/Button/CircleButton";
import PropertyCard from "@/Components/Card/PropertyCard";
import { AnimatePresence } from "framer-motion";
import PropertyDetail from "@/Components/PropertyDetail";
import Select from "react-select";
import { Inertia } from "@inertiajs/inertia";

const propertyFilterOptions = [
    { value: "for sale", label: "Dijual" },
    { value: "sold", label: "Terjual" },
    { value: "for rent", label: "Disewakan" },
    { value: "rent", label: "Disewa" },
];

function Index({ properties, auth, regionOptions, lastPage }) {
    const [allProperties, setAllProperties] = useState(properties);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("for sale");

    const handleChange = (newValue, actionMeta, inputId) => {
        if (newValue) {
            Inertia.reload({
                only: ["properties", "lastPage"],
                data: {
                    status: newValue.value,
                },
                onSuccess: (page) => {
                    setAllProperties([...page.props.properties]);
                    window.history.replaceState({}, "Rumoh", "/admin/property");
                },
            });
            setStatus(newValue.value);
            setPage(1);
        }
    };

    const handleLoadMore = () => {
        Inertia.reload({
            only: ["properties"],
            data: {
                status,
                page: page + 1,
            },
            onSuccess: (page) => {
                setAllProperties([...allProperties, ...page.props.properties]);
                window.history.replaceState({}, "Rumoh", "/admin/property");
            },
        });
        setPage(page + 1);
    };

    window.onscroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight &&
            page < lastPage
        ) {
            handleLoadMore();
        }
    };

    return (
        <Authenticated auth={auth}>
            <div className="mt-4 px-4">
                <Select
                    onChange={handleChange}
                    classNamePrefix="react-select"
                    defaultValue={propertyFilterOptions[0]}
                    options={propertyFilterOptions}
                    className="max-w-xs"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 mt-4 md:mt-4 pb-4 gap-4">
                {allProperties.map((item) => (
                    <PropertyCard
                        {...item}
                        className="p-2 pb-3"
                        key={`property-${item.id}`}
                        layoutId={item.id}
                        onClick={() => setSelectedId(item.id)}
                    ></PropertyCard>
                ))}
            </div>
            <AnimatePresence>
                {selectedId && (
                    <PropertyDetail
                        isAuthenticated={auth.user !== null}
                        selectedId={selectedId}
                        property={
                            properties.filter(
                                (item) => item.id === selectedId
                            )[0]
                        }
                        regionOptions={regionOptions}
                        closeHandler={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>

            <div>
                {!isModalOpen && (
                    <CircleButton
                        onClick={() => setIsModalOpen(true)}
                        className="absolute bottom-10 right-10"
                    >
                        <PlusIcon></PlusIcon>
                    </CircleButton>
                )}
                {/* Add Property Modal */}
                {isModalOpen && (
                    <PropertyForm
                        regionOptions={regionOptions}
                        handleClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </Authenticated>
    );
}

export default Index;
