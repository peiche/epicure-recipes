import { Chip } from "@mui/material";
import { CurrentRefinementsProps, useCurrentRefinements } from "react-instantsearch";
import SearchClearRefinements from "./searchClearRefinements";

interface SearchRefinements extends CurrentRefinementsProps {
    includeAllRefinements: boolean;
}

export default function SearchRefinements(props: SearchRefinements) {
    const {
        items,
        refine,
    } = useCurrentRefinements(props);

    return (
        <>
            {props.includeAllRefinements && items.map((item, i) => (
                item.refinements.map((refinement, j) => (
                    <Chip
                        key={`${i}_${j}`}
                        label={refinement.label}
                        size="small"
                        variant="outlined"
                        onDelete={() => refine(refinement)}
                    />
                ))
            ))}

            {items.length > 0 && (
                <SearchClearRefinements />
            )}
        </>
    )
};
