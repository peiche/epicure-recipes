import { Chip } from "@progress/kendo-react-buttons";
import { ClearRefinementsProps, useClearRefinements } from "react-instantsearch";

export default function SearchClearRefinements(props: ClearRefinementsProps) {
    const {
        canRefine,
        refine,
    } = useClearRefinements();

    return (
        <Chip
            text='Clear all'
            fillMode='solid'
            className="k-rounded-full"
            disabled={!canRefine}
            onClick={refine}
        />
    )
};
