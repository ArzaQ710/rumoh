import React, { useState } from "react";
import Input from "@/Components/Input";
import Guest from "@/Layouts/GuestLayout";
import CreatableSelect from "react-select/creatable";
import { Head, useForm } from "@inertiajs/inertia-react";
import { upperCaseEachWord } from "../Admin/Index";
import Modal from "@/Components/Modal";

const Index = ({ regionOptions }) => {
    const { data, setData, post, processing, reset, errors } = useForm({
        owner_name: "",
        owner_email: "",
        owner_number: "",
        street: "",
        village: "",
        district: "",
        regency: "",
        province: "",
        description: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("daftar.store"), {
            onSuccess: () => {
                reset();
                setIsModalOpen(true);
                setTimeout(() => setIsModalOpen(false), 4000);
            },
        });
    };

    const handleChange = (selectedOptions, regionlevel) => {
        const newVal = {
            ...selectedOptions,
            ["value"]: upperCaseEachWord(selectedOptions.value),
        };

        setData(regionlevel, newVal);
    };

    return (
        <Guest>
            <Head title="Daftarkan Properti" />

            <div className="mt-8">
                <h1 className="text-center font-bold text-3xl px-3">
                    Daftarkan properti anda di situs kami
                </h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4 mt-8 md:my-8 w-full max-w-2xl mx-auto md:rounded-3xl px-4 py-8"
                style={{ backgroundColor: "rgb(244, 248, 252)" }}
            >
                <p className="font-bold px-2">Informasi Pemilik</p>
                <Input className="col-span-2" message={errors.owner_name}>
                    <input
                        value={data.owner_name}
                        onChange={(event) =>
                            setData("owner_name", event.target.value)
                        }
                        type="text"
                        placeholder="Nama"
                        className="rounded-3xl border-0 bg-white focus:ring-0 px-4 w-full"
                    />
                </Input>
                <Input className="col-span-2" message={errors.owner_email}>
                    <input
                        value={data.owner_email}
                        onChange={(event) =>
                            setData("owner_email", event.target.value)
                        }
                        type="text"
                        placeholder="Email"
                        className="rounded-3xl border-0 bg-white focus:ring-0 px-4 w-full"
                    />
                </Input>
                <Input className="col-span-2" message={errors.owner_number}>
                    <input
                        value={data.owner_number}
                        onChange={(event) =>
                            setData(
                                "owner_number",
                                Number.parseInt(event.target.value)
                            )
                        }
                        type="number"
                        placeholder="No Hp/WhatsApp"
                        className="rounded-3xl border-0 bg-white focus:ring-0 px-4 w-full"
                    />
                </Input>

                <p className="font-bold px-2 col-span-2">Informasi Properti</p>
                <Input className="w-full" message={errors.street}>
                    <input
                        value={data.street}
                        onChange={(event) =>
                            setData("street", event.target.value)
                        }
                        type="text"
                        placeholder="Jalan"
                        className="rounded-3xl border-0 bg-white focus:ring-0 px-4 w-full"
                    />
                </Input>
                <Input className="w-full" message={errors.village}>
                    <CreatableSelect
                        isClearable
                        classNamePrefix="react-select"
                        placeholder="Desa"
                        options={regionOptions.villages}
                        onChange={(selectedOptions) =>
                            handleChange(selectedOptions, "village")
                        }
                    />
                </Input>
                <Input className="w-full" message={errors.district}>
                    <CreatableSelect
                        isClearable
                        classNamePrefix="react-select"
                        placeholder="Kecamatan"
                        options={regionOptions.districts}
                        onChange={(selectedOptions) =>
                            handleChange(selectedOptions, "district")
                        }
                    />
                </Input>
                <Input className="w-full" message={errors.regency}>
                    <CreatableSelect
                        isClearable
                        classNamePrefix="react-select"
                        placeholder="Kabupaten"
                        options={regionOptions.regencies}
                        onChange={(selectedOptions) =>
                            handleChange(selectedOptions, "regency")
                        }
                    />
                </Input>
                <Input className="w-full" message={errors.province}>
                    <CreatableSelect
                        isClearable
                        classNamePrefix="react-select"
                        placeholder="Provinsi"
                        options={regionOptions.provinces}
                        onChange={(selectedOptions) =>
                            handleChange(selectedOptions, "province")
                        }
                    />
                </Input>
                <Input className="col-span-2" message={errors.description}>
                    <textarea
                        value={data.description}
                        onChange={(event) =>
                            setData("description", event.target.value)
                        }
                        placeholder="Deskripsi"
                        className="rounded-3xl border-0 bg-white focus:ring-0 px-4 w-full"
                        rows={5}
                    />
                </Input>

                <button
                    type="submit"
                    className="col-span-2 bg-slate-900 text-white rounded-3xl py-3"
                >
                    SUBMIT
                </button>
            </form>

            <Modal isOpen={isModalOpen}>
                <div className="max-w-md shadow px-4 py-4 rounded-3xl mx-auto bg-white">
                    <p className="text-xl">
                        Terima kasih karena sudah percapa kepada kami. Pengajuan
                        anda telah kami catat. Kami akan segera menghubungi
                        anda.
                    </p>
                </div>
            </Modal>
        </Guest>
    );
};

export default Index;
