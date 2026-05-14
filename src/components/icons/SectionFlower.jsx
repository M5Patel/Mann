import flower from "../../assets/star.png";

export default function SvgSectionFlower({ title, titleId, ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="none"
            viewBox="0 0 25 29"
            aria-labelledby={titleId}
            {...props}
        >
            {title ? <title id={titleId}>{title}</title> : null}

            <path fill="url(#section-flower_svg__a)" d="M25 0H0v28.929h25z" />

            <defs>
                <pattern
                    id="section-flower_svg__a"
                    width={1}
                    height={1}
                    patternContentUnits="objectBoundingBox"
                >
                    <use
                        xlinkHref="#section-flower_svg__b"
                        transform="matrix(.00255 0 0 .0022 -.01 0)"
                    />
                </pattern>

                <image
                    href={flower}
                    id="section-flower_svg__b"
                    width={400}
                    height={453}
                />
            </defs>
        </svg>
    );
}