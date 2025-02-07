import { Box, Chip } from "@mui/material";
import { CurrentRefinementsProps, useCurrentRefinements } from "react-instantsearch";
import SearchClearRefinements from "./searchClearRefinements";

export default function SearchRefinements(props: CurrentRefinementsProps) {
    const {
        items,
        refine,
    } = useCurrentRefinements(props);

    return (
        <Box display='flex' flexWrap='wrap' gap={1} mb={2}>
            {items.map((item, i) => (
                item.refinements.map((refinement, j) => (
                    <Chip
                        key={`${i}_${j}`}
                        label={refinement.label}
                        onDelete={() => refine(refinement)}
                    />
                ))
            ))}

            <SearchClearRefinements />
        </Box>
    )
};
