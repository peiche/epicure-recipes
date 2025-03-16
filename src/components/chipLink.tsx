import Link from "next/link";

interface ChipLinkProps {
    name: string;
    link: string;
}

export default function ChipLink({ name, link }: ChipLinkProps) {
    return (
        <Link href={link} dir="ltr" tabIndex={0} className="k-chip k-chip-md k-rounded-md k-chip-outline k-chip-outline-base k-text-no-underline" aria-pressed="false" aria-disabled="false">
            <span className="k-chip-content">
                <span aria-label={name} className="k-chip-label">{name}</span>
            </span>
        </Link>
    );
}