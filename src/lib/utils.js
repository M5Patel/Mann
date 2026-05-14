import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function getAge(birthDate) {
    return Math.floor(
        (new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e10
    );
}
