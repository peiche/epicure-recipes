import { useHits } from "react-instantsearch";
import { RecipeLite } from "../interfaces/Recipe";
import RecipeCard from "./recipeCard";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import { Typography } from "@progress/kendo-react-common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function SearchResultsGrid() {
    const { items } = useHits<RecipeLite>();

    if (items.length === 0) {
        return (
            <div className="k-text-center k-my-5">
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                <Typography.p className="!k-mt-3">
                    Your search returned no results.
                </Typography.p>
            </div>
        )
    }

    return (
        <GridLayout
            className='grid-responsive-2-cols'
            gap={{
                cols: 10,
                rows: 10,
            }}
        >
            {items.map((item) => (
                <GridLayoutItem key={item.objectID}>
                    <RecipeCard recipe={item} />
                </GridLayoutItem>
            ))}
        </GridLayout>
    )
};
