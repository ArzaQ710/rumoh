import { motion } from "framer-motion";
import BathroomIcon from "../../../images/bathroom.svg";
import BedroomIcon from "../../../images/bedroom.svg";

const PropertyCard = ({
    images,
    price,
    description,
    className,
    number_of_bathroom,
    number_of_bedroom,
    village,
    district,
    regency,
    province,
    ...props
}) => {
    const propertyFeatures = [
        {
            icon: BedroomIcon,
            value: number_of_bedroom,
        },
        {
            icon: BathroomIcon,
            value: number_of_bathroom,
        },
    ];

    return (
        <motion.div
            className={`relative property card bg-white cursor-pointer shrink-0 ${className}`}
            initial={{ borderRadius: "0rem" }}
            animate={{ borderRadius: "1.5rem" }}
            exit={{ borderRadius: "0rem" }}
            {...props}
        >
            <div
                className="w-full rounded-3xl bg-cover bg-center"
                style={{
                    paddingTop: "56.25%",
                    backgroundImage: `url(${window.location.origin}/${images[0].image_url})`,
                }}
            ></div>
            <h4 className="text-lg font-bold my-3">
                Rp {price === 0 ? "Hubungi Kami" : price.toLocaleString("id")}
            </h4>
            <div className="flex font-semibold">
                {propertyFeatures.map((item, idx) => (
                    <div className="flex mr-2" key={`property-feature-${idx}`}>
                        <img
                            src={item.icon}
                            alt=""
                            className="w-5 h-auto mr-2"
                        />
                        <p>{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="mt-3">
                <p className="pr-2 text-sm">
                    Desa {village}, Kecamatan {district}, Kabupaten {regency},
                    Provinsi {province}
                </p>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
