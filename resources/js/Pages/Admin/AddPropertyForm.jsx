import React, { useRef } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { X as XIcon } from "react-feather";
import ImageSlider from "@/Components/ImageSlider";
import Input from "@/Components/Input";
import CreatableSelect from "react-select/creatable";
import PrimaryButton from "@/Components/PrimaryButton";

const AddPropertyForm = ({ regionOptions, handleClose }) => {
    const selectFileRef = useRef(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        propertyName: "",
        description: "",
        price: "",
        numberOfBedroom: 0,
        numberOfBathroom: 0,
        map: "",
        street: "",
        village: {},
        district: {},
        regency: {},
        province: {},
        images: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/property/add" /* { onSuccess: () => reset() } */);
    };

    const handleFileChange = (event) => {
        setData("images", [...data.images, ...event.target.files]);
    };

    const handleChange = (newValue, actionMeta, inputId) => {
        if (newValue) {
            const newVal = {
                ...newValue,
                ["value"]: upperCaseEachWord(newValue.value),
            };

            setData(inputId, newVal);
        }
    };

    return (
        <div
            className="absolute container m-auto lg inset-0 w-screen shadow flex flex-wrap p-8 z-50 bg-white rounded-3xl overflow-auto"
            style={{ height: "90vh", backgroundColor: "rgb(244, 248, 252)" }}
        >
            <div className="w-full flex justify-end mb-4 h-fit">
                <button
                    className="shadow bg-white flex justify-center items-center rounded-full p-2"
                    onClick={handleClose}
                    style={{ width: "44px", height: "44px" }}
                >
                    <XIcon />
                </button>
            </div>
            <div className="w-1/2">
                <ImageSlider images={data.images} />

                <button
                    className="bg-white shadow w-full mt-4 p-3 rounded-3xl"
                    onClick={() => selectFileRef.current.click()}
                >
                    Pilih gambar
                </button>

                <input
                    name="images"
                    style={{ display: "none" }}
                    ref={selectFileRef}
                    type="file"
                    multiple={true}
                    onChange={handleFileChange}
                />
            </div>
            <div className="w-1/2 pl-8">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <Input message={errors.propertyName}>
                        <input
                            value={data.propertyName}
                            onChange={(event) =>
                                setData("propertyName", event.target.value)
                            }
                            type="text"
                            placeholder="Nama properti"
                            className="w-full rounded-3xl border-0 focus:ring-0 px-4"
                        />
                    </Input>
                    <Input message={errors.description}>
                        <textarea
                            value={data.description}
                            onChange={(event) =>
                                setData("description", event.target.value)
                            }
                            name=""
                            id=""
                            rows="5"
                            placeholder="Deskripsi"
                            className="w-full mt-4 rounded-3xl border-0 focus:ring-0 px-4"
                        ></textarea>
                    </Input>

                    <Input message={errors.price}>
                        <input
                            value={data.price}
                            onChange={(event) =>
                                setData("price", event.target.value)
                            }
                            type="number"
                            placeholder="Harga"
                            className="w-full mt-4 rounded-3xl border-0 focus:ring-0 px-4"
                        />
                    </Input>

                    <Input message={errors.numberOfBedroom}>
                        <input
                            value={data.numberOfBedroom}
                            onChange={(event) =>
                                setData("numberOfBedroom", event.target.value)
                            }
                            type="number"
                            placeholder="Jumlah Kamar Tidur"
                            className="w-full mt-4 rounded-3xl border-0 focus:ring-0 px-4"
                        />
                    </Input>

                    <div className="mt-6">Alamat</div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Input message={errors.map}>
                            <input
                                value={data.map}
                                onChange={(event) =>
                                    setData("map", event.target.value)
                                }
                                type="text"
                                placeholder="Map"
                                className="w-full rounded-3xl border-0 focus:ring-0 px-4"
                            />
                        </Input>
                        <Input message={errors.street}>
                            <input
                                value={data.street}
                                onChange={(event) =>
                                    setData("street", event.target.value)
                                }
                                type="text"
                                placeholder="Jalan"
                                className="w-full rounded-3xl border-0 focus:ring-0 px-4"
                            />
                        </Input>
                        <Input message={errors.village}>
                            <CreatableSelect
                                classNamePrefix="react-select"
                                isClearable
                                placeholder="Desa"
                                onChange={(newValue, actionMeta) =>
                                    handleChange(
                                        newValue,
                                        actionMeta,
                                        "village"
                                    )
                                }
                                options={regionOptions.village}
                            />
                        </Input>
                        <Input message={errors.district}>
                            <CreatableSelect
                                classNamePrefix="react-select"
                                isClearable
                                placeholder="Kecamatan"
                                onChange={(newValue, actionMeta) =>
                                    handleChange(
                                        newValue,
                                        actionMeta,
                                        "district"
                                    )
                                }
                                options={regionOptions.district}
                            />
                        </Input>

                        <Input message={errors.regency}>
                            <CreatableSelect
                                classNamePrefix="react-select"
                                isClearable
                                placeholder="Kabupaten"
                                onChange={(newValue, actionMeta) =>
                                    handleChange(
                                        newValue,
                                        actionMeta,
                                        "regency"
                                    )
                                }
                                options={regionOptions.regency}
                            />
                        </Input>
                        <Input message={errors.province}>
                            <CreatableSelect
                                classNamePrefix="react-select"
                                isClearable
                                placeholder="Provinsi"
                                onChange={(newValue, actionMeta) =>
                                    handleChange(
                                        newValue,
                                        actionMeta,
                                        "province"
                                    )
                                }
                                options={regionOptions.province}
                            />
                        </Input>
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="mt-4 py-3 rounded-3xl"
                    >
                        Tambah
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyForm;
