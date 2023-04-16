import React from "react";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/inertia-react";

const Index = () => {
    return (
        <Guest>
            <Head title="Tentang Kami" />

            <div className="container mx-auto my-12">
                <h1 className="text-center text-2xl font-bold">Tentang Kami</h1>

                <div className="mx-4 mt-4 md:px-12 lg:px-20 leading-8 text-justify">
                    <p className="mb-2">
                        Kami adalah Agen Properti atau juga dapat disebut para
                        pebisnis Real Estate Agent yang akan membantu anda
                        menemukan dan menjual properti berkualitas dengan cara
                        yang anti ribet, modern, aman, terpercaya, dan
                        mengesankan. Kami lahir di provinsi Aceh dengan semangat
                        yang kuat untuk berdedikasi secara penuh memberikan
                        pelayanan yang anda butuhkan dalam dunia properti.
                        Membantu anda menemukan properti idaman yang akan
                        menjadi bagian dari petualangan hidup anda. Kami juga
                        membuka ruang lebar untuk bekerjasama dalam bisnis
                        properti yang anda miliki dikemudian hari, tentunya
                        dengan cara yang professional.
                    </p>
                    <p className="mb-2">
                        Kami terus berkomitmen untuk berkembang sesuai hukum
                        Indonesia dan agama, inilah tujuan utama kami. Hubungi{" "}
                        <a
                            className="border-slate-900 border-b-2"
                            href="tel:6281377152414"
                        >
                            nomor
                        </a>{" "}
                        atau{" "}
                        <a
                            className="border-slate-900 border-b-2"
                            href="mailto:sale@rumoh.id"
                        >
                            email
                        </a>{" "}
                        untuk bisa terhubung dengan kami. Bekerjasama dengan
                        anda adalah hal paling kami nantikan.
                    </p>
                    <p>Teurimong gaseh.</p>
                </div>
            </div>
        </Guest>
    );
};

export default Index;
