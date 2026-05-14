import { SectionFlower } from "@/components/icons";
import { cn } from "@/lib/utils";

export default function SectionTitle({ icon, title, className, classNames }) {
    return (
        <div
            className={cn(
                "mb-10 flex items-center gap-4",
                className,
                classNames?.container
            )}
        >
            {icon ? (
                icon
            ) : (
                <SectionFlower
                    width={25}
                    className={cn("animate-spin duration-7000", classNames?.icon)}
                />
            )}
            <h2 className={cn("text-xl leading-none uppercase", classNames?.title)}>
                {title}
            </h2>
        </div>
    );
}
