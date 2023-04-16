import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function Modal({ isOpen, children, ...props }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, transform: "translate(-50%, -40%)" }}
                    animate={{ opacity: 1, transform: "translate(-50%, -50%)" }}
                    exit={{ opacity: 0, transform: "translate(-50%, -40%)" }}
                    className="fixed rounded-3xl z-50"
                    style={{
                        top: "50%",
                        left: "50%",
                        width: "90vw",
                        maxHeight: "90vh",
                    }}
                    {...props}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
