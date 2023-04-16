import React from "react";
import whatsappIcon from "../../images/whatsapp.png";

function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/6281377152414"
            target="_blank"
            className="fixed right-6 bottom-6"
        >
            <img
                src={whatsappIcon}
                alt="whatsapp contact"
                className="w-12 h-12"
            />
        </a>
    );
}

export default WhatsAppButton;
