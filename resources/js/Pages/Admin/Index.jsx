import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import AddPropertyForm from "./AddPropertyForm";

export const upperCaseEachWord = (str) => {
    const arr = str.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
};

function Index({ auth, regionOptions }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Authenticated auth={auth}>
            <div>
                <button onClick={() => setIsModalOpen(true)}>
                    Tambah properti
                </button>
                {/* Add Property Modal */}
                {isModalOpen && (
                    <AddPropertyForm
                        regionOptions={regionOptions}
                        handleClose={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </Authenticated>
    );
}

export default Index;
