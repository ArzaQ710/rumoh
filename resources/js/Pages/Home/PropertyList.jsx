import PropertyCard from "@/Components/Card/PropertyCard";
import PropertyDetail from "@/Components/PropertyDetail";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionTitle from "./SectionTitle";

const PropertyList = ({ properties }) => {
    const [selectedId, setSelectedId] = useState(null);

    const openPropertyDetail = (id) => {
        Inertia.reload({
            method: "get",
            data: {
                id,
            },
            preserveState: true,
            preserveScroll: true,
            only: [""],
        });
    };

    return (
        <div style={{ backgroundColor: "#f4f8fc" }}>
            <div className="container xl mx-auto px-4 lg:px-16 py-8 md:py-16">
                <div className="flex justify-between">
                    <SectionTitle>Properti</SectionTitle>
                    <Link href={route("cari")} className="text-slate-900">
                        Selengkapnya
                    </Link>
                </div>

                <div className="flex flex-nowrap md:flex-wrap mt-5 overflow-auto md:grid md:grid-cols-4 md:gap-4">
                    {properties.map((item, idx) => (
                        <PropertyCard
                            {...item}
                            className={`max-w-xs p-2 pb-3 mr-4 md:m-0 last:m-0`}
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
        </div>
    );
};

export default PropertyList;
