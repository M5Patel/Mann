import { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";

export default function Cursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouchDevice = () => {
            // Streamlined touch detection
            const hasTouchScreen =
                "ontouchstart" in window ||
                navigator.maxTouchPoints > 0;

            setIsTouchDevice(hasTouchScreen);
        };

        checkTouchDevice();
    }, []);

    // Don't render custom cursor on mobile/tablets
    if (isTouchDevice) {
        return null;
    }

    return (
        <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1}
            outerScale={1.7}
            outerAlpha={0} // Set to 0 because we are using a border instead of a solid fill
            trailingSpeed={8}
            innerStyle={{
                backgroundColor: "var(--accent-color, #ffffff)",
                mixBlendMode: "exclusion" 
            }}
            outerStyle={{
                border: "2px solid var(--accent-color, #ffffff)",
                backgroundColor: "transparent",
                mixBlendMode: "exclusion"
            }}
            clickables={[
                "a",
                "button",
                "input[type='text']",
                "input[type='email']",
                "input[type='number']",
                "input[type='submit']",
                "input[type='image']",
                "label[for]",
                "select",
                "textarea",
                ".link",
                ".cursor-pointer", // Add this class to anything you want to trigger the hover state
                ".project-card"    // Example: Trigger cursor expansion on your portfolio items
            ]}
        />
    );
}