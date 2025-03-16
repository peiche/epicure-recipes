import { Typography } from "@progress/kendo-react-common";

interface FilterPanelProps {
    label: string;
    children?: React.ReactNode;
}

export default function SearchFilterPanel({ label, children }: FilterPanelProps) {
    return (
        <>
            <Typography.h2 className="k-h5 !k-font-normal !k-mb-1">{label}</Typography.h2>
            <div className="k-mb-2">
                {children}
            </div>
        </>
    )
};