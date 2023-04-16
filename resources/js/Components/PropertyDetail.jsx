import PropertyForm from "@/Pages/Property/PropertyForm";
import { Inertia } from "@inertiajs/inertia";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit, Trash } from "react-feather";
import ImageSlider from "./ImageSlider";

function PropertyDetail({
    isAuthenticated,
    property,
    regionOptions,
    selectedId,
    closeHandler,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const imagesArr = property.images.map((item) => item.image_url);
    const {
        id,
        name,
        price,
        number_of_bedroom,
        number_of_bathroom,
        land_area,
        description,
        village,
        district,
        regency,
        province,
    } = property;
    const baseUrl = window.location.origin;
    const orderLink = `https://wa.me/6281377152414?text=Kami berminat dengan property berikut ${baseUrl}/admin/property/detail/${id}.`;

    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = "hidden";
            return () => (document.body.style.overflow = "unset");
        }
    }, [selectedId]);

    return (
        <motion.div
            layoutId={selectedId}
            initial={{ borderRadius: "1.5rem" }}
            animate={{
                borderRadius: "0rem",
            }}
            exit={{ borderRadius: "1.5rem" }}
            className="fixed bg-white top-0 left-0 h-screen w-screen overflow-y-auto px-4 md:px-6 lg:px-8 pb-20 z-50"
        >
            <div className="py-4 flex items-center justify-between">
                <button onClick={() => closeHandler()}>
                    <ArrowLeft />
                </button>

                {isAuthenticated && (
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                closeHandler();
                                Inertia.delete(
                                    route("property.destroy", property.id)
                                );
                            }}
                        >
                            <Trash />
                        </button>

                        <button
                            onClick={() => {
                                setIsEditing(true);
                            }}
                            className="ml-4"
                        >
                            <Edit />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row overflow-y-auto">
                <div className="rounded-3xl overflow-hidden lg:w-2/5 h-fit">
                    <ImageSlider images={imagesArr} />
                </div>

                <div className="mt-4 lg:w-3/5 lg:mt-0 lg:px-4">
                    <h2 className="font-bold text-lg">{name}</h2>

                    <div className="flex mt-2 justify-between items-center">
                        <p className="pr-2 text-sm">
                            Desa {village}, Kecamatan {district}, Kabupaten{" "}
                            {regency}, Provinsi {province}
                        </p>
                    </div>

                    <div className="mt-4 flex flex-nowrap overflow-auto text-white">
                        <div className="flex bg-slate-900 items-center px-4 rounded-3xl w-fit h-fit py-2 mr-3 shrink-0">
                            <div className="mr-2">Kamar Tidur</div>
                            <div>{number_of_bedroom}</div>
                        </div>
                        <div className="flex bg-slate-900 items-center px-4 rounded-3xl w-fit h-fit py-2 mr-3 shrink-0">
                            <div className="mr-2">Kamar Mandi</div>
                            <div>{number_of_bathroom}</div>
                        </div>
                        <div className="flex bg-slate-900 items-center px-4 rounded-3xl w-fit h-fit py-2 mr-3 shrink-0">
                            <div className="mr-2">Luas Lahan</div>
                            <div>
                                {land_area} m<sup>2</sup>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        {description.split(/\r?\n/).map((item, idx) => (
                            <p className="mt-2" key={`description-${idx}`}>
                                {item}
                            </p>
                        ))}
                    </div>

                    <div className="fixed bottom-0 left-0 flex border-t-2 border-slate-200 justify-between items-center w-full p-4 md:px-6 lg:px-8 bg-white">
                        <p className="mt-2 font-bold">
                            Rp{" "}
                            {price === 0
                                ? "Hubungi Kami"
                                : price.toLocaleString("id")}
                        </p>
                        <a
                            href={orderLink}
                            target="_blank"
                            className="bg-slate-900 text-white px-4 py-2 rounded-3xl"
                        >
                            Pesan Sekarang
                        </a>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isEditing && (
                    <PropertyForm
                        dataEdit={property}
                        regionOptions={regionOptions}
                        isEditing={isEditing}
                        handleClose={() => setIsEditing(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default PropertyDetail;
