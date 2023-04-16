import React from "react";
import { Instagram, Facebook, Youtube, Mail } from "react-feather";
import logoLight from "../../../images/logo-light.png";

const links = [
    { name: "FAQs", route: "#" },
    { name: "Privacy Policy", route: "#" },
    { name: "Syarat & Ketentuan", route: "#" },
    { name: "Cookies Policy", route: "#" },
];

const socialMedia = [
    { link: "https://www.instagram.com/rumoh._id/", icon: Instagram },
    {
        link: "https://www.facebook.com/profile.php?id=100088156367621",
        icon: Facebook,
    },
    {
        link: "https://www.youtube.com/channel/UCQwdkwNjcjiX0iJhvATdo5g",
        icon: Youtube,
    },
    {
        link: "mailto:sale@rumoh.id",
        icon: Mail,
    },
];

function Footer() {
    return (
        <div className="bg-slate-900 text-white">
            <div className="container xl mx-auto px-4 lg:px-16 py-8">
                <div className="font-bold text-2xl">
                    <img src={logoLight} alt="logo" className="h-auto w-36" />
                </div>
                <div className="flex mt-4 flex-col md:flex-row">
                    <div className="md:w-full">
                        <p>
                            Desa Blang Krueng, Kecamatan Baitussalam, Kabupaten
                            Aceh Besar, Aceh
                        </p>
                    </div>
                    {/* <div className="flex flex-1 justify-end mt-4 md:mt-0">
                        <ul className="flex flex-wrap">
                            {links.map((item, idx) => (
                                <a href={item.route} key={idx} className="mr-3">
                                    {item.name}
                                </a>
                            ))}
                        </ul>
                    </div> */}
                </div>
                <div className="flex justify-center mt-4 md:justify-start">
                    {socialMedia.map((item, idx) => (
                        <a href={item.link} key={idx} className="mr-4">
                            <item.icon />
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex justify-center border-t-2 border-slate-100 p-3">
                Copyright © rumoh.id {new Date().getFullYear()}
            </div>
        </div>
    );
}

export default Footer;
