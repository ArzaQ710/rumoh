import React, { useRef } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { X as XIcon } from "react-feather";
import ImageSlider from "@/Components/ImageSlider";
import Input from "@/Components/Input";
import CreatableSelect from "react-select/creatable";
import PrimaryButton from "@/Components/PrimaryButton";
import CircleButton from "@/Components/Button/CircleButton";
import { startCase } from "lodash";
import Select from "react-select";

const propertyStatuses = [
    { value: "for sale", label: "Dijual" },
    { value: "sold", label: "Terjual" },
    { value: "for rent", label: "Disewakan" },
    { value: "rent", label: "Disewa" },
];

const PropertyForm = ({
    dataEdit = {
        propertyName: "",
        description: "",
        price: "",
        number_of_bedroom: "",
        number_of_bathroom: "",
        land_area: "",
        status: {},
        map: "",
        street: "",
        village: {},
        district: {},
        regency: {},
        province: {},
        images: [],
    },
    regionOptions,
    isEditing,
    handleClose,
}) => {
    const selectFileRef = useRef(null);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        propertyName: dataEdit.name,
        description: dataEdit.description,
        price: dataEdit.price,
        numberOfBedroom: dataEdit.number_of_bedroom,
        numberOfBathroom: dataEdit.number_of_bathroom,
        landArea: dataEdit.land_area,
        status: dataEdit.status,
        map: dataEdit.map_coord,
        street: dataEdit.street,
        village: { label: dataEdit.village, value: dataEdit.village },
        district: { label: dataEdit.district, value: dataEdit.district },
        regency: { label: dataEdit.regency, value: dataEdit.regency },
        province: { label: dataEdit.province, value: dataEdit.province },
        images: dataEdit.images.map((item) => item.image_url),
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            patch(route("property.update", dataEdit.id));
        } else {
            post(route("property.store"), {
                onSuccess: () => {
                    handleClose();
                    reset();
                },
            });
        }
    };

    const handleFileChange = (event) => {
        setData("images", [...data.images, ...event.target.files]);
    };

    const handleChange = (newValue, actionMeta, inputId) => {
        if (newValue) {
            const newVal = {
                ...newValue,
                ["value"]: startCase(newValue.value),
            };

            setData(inputId, newVal);
        }
    };

    const handleStatusChange = (newValue) => {
        setData("status", newValue.value);
    };

    return (
        <div
            className="absolute container m-auto lg inset-0 w-screen shadow flex flex-wrap p-8 z-50 bg-white rounded-3xl overflow-auto"
            style={{ height: "90vh", backgroundColor: "rgb(244, 248, 252)" }}
        >
            <div className="w-full flex justify-end mb-4 h-fit">
                <CircleButton onClick={handleClose}>
                    <XIcon></XIcon>
                </CircleButton>
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
                            placeholder="Nama Properti"
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
                        <div className="flex items-center pl-4 rounded-3xl mt-4 bg-white">
                            <div>Rp</div>
                            <input
                                value={
                                    data.price === ""
                                        ? data.price
                                        : Number.parseInt(
                                              data.price
                                          ).toLocaleString("id")
                                }
                                onChange={(event) =>
                                    setData(
                                        "price",
                                        event.target.value.replaceAll(".", "")
                                    )
                                }
                                type="text"
                                placeholder="Harga"
                                className="w-3/4 border-0 focus:ring-0 px-2"
                            />
                        </div>
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

                    <Input message={errors.numberOfBathroom}>
                        <input
                            value={data.numberOfBathroom}
                            onChange={(event) =>
                                setData("numberOfBathroom", event.target.value)
                            }
                            type="number"
                            placeholder="Jumlah Kamar Mandi"
                            className="w-full mt-4 rounded-3xl border-0 focus:ring-0 px-4"
                        />
                    </Input>

                    <Input message={errors.landArea}>
                        <input
                            value={data.landArea}
                            onChange={(event) =>
                                setData("landArea", event.target.value)
                            }
                            type="number"
                            placeholder="Luas Lahan"
                            className="w-full mt-4 rounded-3xl border-0 focus:ring-0 px-4"
                        />
                    </Input>

                    <Input message={errors.status}>
                        <Select
                            onChange={handleStatusChange}
                            classNamePrefix="react-select"
                            defaultValue={propertyStatuses.filter(
                                (item) => item.value === data.status
                            )}
                            options={
                                isEditing
                                    ? propertyStatuses
                                    : propertyStatuses.filter(
                                          (item, idx) => idx % 2 === 0
                                      )
                            }
                            className="w-full mt-4 rounded-3xl border-0 focus:ring-0"
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
                                defaultValue={
                                    regionOptions.villages[
                                        regionOptions.villages.findIndex(
                                            (el) =>
                                                el.value === dataEdit.village
                                        )
                                    ]
                                }
                                options={regionOptions.villages}
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
                                defaultValue={
                                    regionOptions.districts[
                                        regionOptions.districts.findIndex(
                                            (el) =>
                                                el.value === dataEdit.district
                                        )
                                    ]
                                }
                                options={regionOptions.districts}
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
                                defaultValue={
                                    regionOptions.regencies[
                                        regionOptions.regencies.findIndex(
                                            (el) =>
                                                el.value === dataEdit.regency
                                        )
                                    ]
                                }
                                options={regionOptions.regencies}
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
                                defaultValue={
                                    regionOptions.provinces[
                                        regionOptions.provinces.findIndex(
                                            (el) =>
                                                el.value === dataEdit.province
                                        )
                                    ]
                                }
                                options={regionOptions.provinces}
                            />
                        </Input>
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="mt-4 py-3 rounded-3xl"
                    >
                        {isEditing ? "Ubah" : "Tambah"}
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm;
