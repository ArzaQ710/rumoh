import WhatsAppButton from "@/Components/WhatsAppButton";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/inertia-react";
import Carousel from "./Carousel";
import PropertyList from "./PropertyList";
import WhyUs from "./WhyUs";

export default function Index({ properties, ...props }) {
    return (
        <Guest>
            <Head title="Beranda" />

            <div>
                <Carousel></Carousel>
                <WhyUs></WhyUs>
                <PropertyList properties={properties}></PropertyList>
            </div>

            <WhatsAppButton />
        </Guest>
    );
}
