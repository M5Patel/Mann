"use client";

import { useEffect } from "react";

export default function Signature() {
    useEffect(() => {
        console.log(
            "%c MANN %c Developed with ❤️ ",
            "color:#fff; font-weight:bold; font-size:14px; padding:8px 12px; border-radius:6px; background:linear-gradient(135deg, #ff0000, #ff4b2b);",
            "color:#fff; font-size:14px; padding:8px 12px; border-radius:6px; background:linear-gradient(135deg, #1d2b64, #f8cdda);"
        );
    }, []);
    return null;
}
