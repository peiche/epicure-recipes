import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Chip } from "@progress/kendo-react-buttons";
import { Typography } from "@progress/kendo-react-common";
import { Checkbox } from "@progress/kendo-react-inputs";
import { RefinementListProps, useRefinementList } from "react-instantsearch";

export default function SearchRefinementList(props: RefinementListProps) {
    const {
        items,
        refine,
        toggleShowMore,
        canToggleShowMore,
        isShowingMore,
    } = useRefinementList(props);

    if (items.length === 0) {
        return (
            <Typography.p className="k-text-subtle">
                <i>There are no refinements available.</i>
            </Typography.p>
        )
    }

    return (
        <>
            {items.map((item, index) => (
                <div key={index} className="checkbox-wrapper">
                    <Checkbox
                        checked={item.isRefined}
                        onChange={() => refine(item.value)}
                        label={
                            <span>
                                <span>{item.label}</span>
                                <Chip
                                    text={item.count.toString()}
                                    size='small'
                                    fillMode='outline'
                                    className="k-rounded-full"
                                />
                            </span>
                        }
                    />
                </div>
            ))}

            {canToggleShowMore && (
                <Button
                    onClick={toggleShowMore}
                    fillMode='link'
                    startIcon={
                        <>
                            {isShowingMore ? (
                                <FontAwesomeIcon icon={faChevronUp} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronDown} />
                            )}
                        </>
                    }
                >
                    {isShowingMore ? 'Show less' : 'Show more'}
                </Button>
            )}
        </>
    )
};
