import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { Link } from "@inertiajs/inertia-react";
import logo from "../../../images/logo.png";
import { X } from "react-feather";

const menu = [
    { name: "Beranda", route: "/" },
    { name: "Cari Properti", route: "/cari" },
    { name: "Daftarkan Properti", route: "/daftar" },
    { name: "Tentang Kami", route: "/tentang" },
];

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="flex justify-between items-center px-4 lg:px-16 container xl mx-auto"
            style={{ height: "80px" }}
        >
            <div id="brand" className="font-bold text-2xl">
                <a href="/">
                    <img src={logo} alt="brand logo" className="h-auto w-36" />
                </a>
            </div>
            <div id="menu" className="grow hidden md:block">
                <ul className="flex justify-center">
                    {menu.map((item) => (
                        <li key={item.name} className="mr-10">
                            <Link href={item.route}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:hidden">
                <button className="p-2" onClick={() => setIsOpen(true)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </div>

            <Modal isOpen={isOpen}>
                <div className="flex flex-col items-center bg-white rounded-3xl pb-3">
                    <ul className="text-center">
                        {menu.map((item) => (
                            <li key={item.name} className="my-3">
                                <Link href={item.route}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="mt-2 shadow p-2 rounded-full"
                    >
                        <X />
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Header;
