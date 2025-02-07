import { Chip } from "@mui/material";
import { ClearRefinementsProps, useClearRefinements } from "react-instantsearch";

export default function SearchClearRefinements(props: ClearRefinementsProps) {
    const {
        canRefine,
        refine,
    } = useClearRefinements();

    return (
        <Chip
            label='Clear all'
            disabled={!canRefine}
            onClick={refine}
        />
    )
};
