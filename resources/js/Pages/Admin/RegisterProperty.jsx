import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import React from "react";
import { Trash, Mail, Phone } from "react-feather";

const Card = ({
    id,
    owner_name,
    owner_email,
    owner_number,
    description,
    street,
    village,
    district,
    regency,
    province,
}) => {
    const handleDelete = () => {
        console.log(route("admin.destroyRegisterProperty", id));
        Inertia.delete(route("admin.destroyRegisterProperty", id));
    };

    return (
        <div className="bg-white mt-4 p-4 rounded-3xl">
            <div className="flex justify-between items-start">
                <div>
                    <div className="font-bold">{owner_name}</div>

                    <div>
                        <p className="text-sm">
                            Jalan {street}, Desa {village}, Kecamatan {district}
                            , Kabupaten {regency}, Provinsi {province}
                        </p>
                    </div>

                    <div className="mt-3">
                        <p>{description}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center ml-3">
                    <button className="p-2" onClick={handleDelete}>
                        <Trash />
                    </button>

                    <a
                        href={`mailto:${owner_email}`}
                        className="rounded-full mt-2 bg-gray-900 p-2 text-white"
                    >
                        <Mail size={16}></Mail>
                    </a>

                    <a
                        href={`https://wa.me/${
                            owner_number[0] === 6
                                ? owner_number
                                : `62${owner_number}`
                        }`}
                        target="_blank"
                        className="rounded-full mt-4 bg-gray-900 p-2 text-white"
                    >
                        <Phone size={16}></Phone>
                    </a>
                </div>
            </div>
        </div>
    );
};

const RegisterProperty = ({ auth, registerPropertyRequests }) => {
    return (
        <Authenticated auth={auth}>
            <div className="container mx-auto px-4 md:px-12">
                {registerPropertyRequests.map((item) => (
                    <Card
                        {...item}
                        key={`registerPropertyRequest-${item.id}`}
                    />
                ))}
            </div>
        </Authenticated>
    );
};

export default RegisterProperty;
