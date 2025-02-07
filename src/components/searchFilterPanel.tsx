import { Box, Typography } from "@mui/material";

interface FilterPanelProps {
    label: string;
    children?: React.ReactNode;
}

export default function SearchFilterPanel({ label, children }: FilterPanelProps) {
    return (
        <>
            <Typography variant='body2' textTransform='uppercase'>{label}</Typography>
            <Box mb={2}>
                {children}
            </Box>
        </>
    )
};