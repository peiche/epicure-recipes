import { CurrentRefinementsProps, useCurrentRefinements } from "react-instantsearch";
import SearchClearRefinements from "./searchClearRefinements";
import { Chip } from "@progress/kendo-react-buttons";

export default function SearchRefinements(props: CurrentRefinementsProps) {
    const {
        items,
        refine,
    } = useCurrentRefinements(props);

    return (
        <div className="k-d-flex k-gap-2 k-flex-wrap k-mb-2">
            {items.map((item, i) => (
                item.refinements.map((refinement, j) => (
                    <Chip
                        key={`refinement-${i}_${j}`}
                        text={refinement.label}
                        fillMode='solid'
                        className="k-rounded-full"
                        removable
                        onRemove={() => refine(refinement)}
                    />
                ))
            ))}

            <SearchClearRefinements />
        </div>
    )
};
