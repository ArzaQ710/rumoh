import React from "react";
import ImageSlider from "@/Components/ImageSlider";
import { MapPin } from "react-feather";

function Detail({ property }) {
    const imagesArr = property.images.map((item) => item.image_url);
    const {
        name,
        price,
        description,
        street,
        number_of_bedroom,
        number_of_bathroom,
        land_area,
        village,
        district,
        regency,
        map_coord,
        province,
    } = property;

    return (
        <div className="fixed bg-white top-0 left-0 h-screen w-screen overflow-y-auto px-4 md:px-6 lg:px-8 pb-20 z-50 pt-4">
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

                        <a href={map_coord}>
                            <MapPin />
                        </a>
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
                        <p className="mt-2">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
