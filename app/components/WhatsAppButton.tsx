"use client";

import React, { useState } from "react";

interface WhatsAppButtonProps {
    phone?: string;
    message?: string;
}

/**
 * Reusable Floating WhatsApp Chat Button Component
 *
 * @param {WhatsAppButtonProps} [props]
 * @param {string} [props.phone="919075313801"] - Seller phone number.
 * @param {string} [props.message="Hi"] - Pre-filled text customer sends.
 */
const WhatsAppButton = ({
    phone = "919075313801",
    message = "Hi",
}: WhatsAppButtonProps = {}) => {
    const [isHovered, setIsHovered] = useState(false);

    // 1. Strip everything except digits (+, spaces, dashes)
    let cleanPhone = phone ? String(phone).replace(/\D/g, "") : "";

    // 2. If empty, return null (render nothing)
    if (!cleanPhone) {
        return null;
    }

    // 3. If exactly 10 digits, prepend "91" (India country code)
    if (cleanPhone.length === 10) {
        cleanPhone = `91${cleanPhone}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            style={{
                position: "fixed",
                bottom: "24px",
                right: "24px",
                width: "56px",
                height: "56px",
                backgroundColor: "#25D366",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isHovered
                    ? "0 6px 20px rgba(37, 211, 102, 0.45)"
                    : "0 4px 14px rgba(0, 0, 0, 0.25)",
                transform: isHovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                zIndex: 9999,
                cursor: "pointer",
                textDecoration: "none",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Official WhatsApp Logo SVG */}
            <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="#ffffff"
                style={{ display: "block" }}
                aria-hidden="true"
                focusable="false"
            >
                <path d="M17.472 14.382c-.301-.15-1.776-.876-2.05-1-.274-.124-.474-.186-.673.124-.199.31-.772 1.002-.947 1.201-.175.199-.349.224-.65.075-.3-.15-1.267-.467-2.414-1.49-.893-.797-1.496-1.782-1.67-2.082-.175-.3-.019-.462.13-.61.135-.133.301-.349.452-.524.15-.175.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.673-1.624-.922-2.222-.243-.582-.49-.503-.673-.512l-.574-.01c-.2 0-.523.075-.798.374s-1.048 1.022-1.048 2.493 1.072 2.892 1.222 3.092c.15.199 2.11 3.223 5.112 4.518.714.309 1.272.493 1.706.631.717.228 1.369.195 1.884.119.575-.086 1.776-.725 2.025-1.424.25-.699.25-1.297.175-1.423-.075-.126-.274-.2-.575-.35zm-5.467 6.467c-1.92 0-3.805-.516-5.457-1.498l-.391-.233-4.057 1.064 1.083-3.953-.255-.407C1.9 14.07 1.34 12.062 1.34 10.016 1.34 5.596 4.939 2 9.359 2c2.14 0 4.154.834 5.667 2.349 1.514 1.514 2.348 3.527 2.348 5.667 0 4.42-3.599 8.016-8.019 8.016zM20.52 3.48A11.93 11.93 0 0012.012 0C5.388 0 .005 5.384 0 12.008c0 2.112.552 4.174 1.601 5.992L0 24l6.166-1.617a11.96 11.96 0 005.842 1.507h.005c6.623 0 12.007-5.384 12.008-12.008 0-3.208-1.25-6.223-3.501-8.402z" />
            </svg>
        </a>
    );
};

export default WhatsAppButton;