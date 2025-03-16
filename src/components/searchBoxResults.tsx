import { faAlgolia } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DynamicWidgets, useSearchBox } from "react-instantsearch";
import SearchFilterPanel from "./searchFilterPanel";
import SearchRefinementList from "./searchRefinementList";
import SearchResultsGrid from "./searchResultsGrid";
import SearchPagination from "./searchPagination";
import SearchRefinements from "./searchRefinements";
import SearchDrawer from "./searchDrawer";
import { Typography } from "@progress/kendo-react-common";
import Link from "next/link";
import { TextBox } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";

export default function SearchBoxResults() {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');

    const {
        query,
        refine,
        clear,
    } = useSearchBox();

    useEffect(() => {
        search && refine(search);
    }, [search]);

    const handleClearSearch = () => {
        clear();
        document.getElementById('search-input')?.focus();
    };

    const filterSidebar = (
        <DynamicWidgets>
            <SearchFilterPanel label='Tags'>
                <SearchRefinementList attribute='tags.name' limit={5} showMore={true} />
            </SearchFilterPanel>
            <SearchFilterPanel label='Products'>
                <SearchRefinementList attribute='products.name' limit={5} showMore={true} />
            </SearchFilterPanel>
        </DynamicWidgets>
    );

    return (
        <>
            <div className="k-d-flex k-gap-2 k-align-items-center k-relative">
                <FontAwesomeIcon icon={faSearch} style={{
                    position: 'absolute',
                    left: '10px',
                }} />
                <TextBox
                    fillMode='outline'
                    size='large'
                    id='search-input'
                    placeholder='Search...'
                    value={query}
                    onChange={(event) => {
                        if (typeof event.target.value === 'string') {
                            refine(event.target.value);
                        }
                    }}
                    autoComplete='off'
                    autoFocus
                    style={{
                        paddingLeft: '30px',
                    }}
                />
                {query && (
                    <Button
                        size='large'
                        fillMode='flat'
                        rounded='full'
                        startIcon={<FontAwesomeIcon icon={faClose} />}
                        onClick={handleClearSearch}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            zIndex: 1,
                        }}
                    />
                )}
            </div>
            <div className="k-text-right k-mt-1 k-mb-2 k-font-size-md">
                <Link
                    href='https://www.algolia.com'
                    target="_blank"
                    className="k-link"
                >
                    Search powered by{` `}
                    <FontAwesomeIcon icon={faAlgolia} />
                </Link>
            </div>

            {query ? (
                <>
                    <div className="k-d-xs-none k-d-md-block">
                        <SearchRefinements />
                    </div>
                    <div className="k-d-md-none">
                        <SearchDrawer>
                            <SearchRefinements />
                            {filterSidebar}
                        </SearchDrawer>
                    </div>
                    <GridLayout
                        className="grid-responsive-sidebar"
                        gap={{
                            cols: 10,
                            rows: 10,
                        }}
                    >
                        <GridLayoutItem className="k-d-xs-none k-d-md-block">
                            {filterSidebar}
                        </GridLayoutItem>
                        <GridLayoutItem>
                            <SearchResultsGrid />
                        </GridLayoutItem>
                    </GridLayout>

                    <div className="k-mt-3">
                        <SearchPagination />
                    </div>
                </>
            ) : (
                <div className="p-5">
                    <Typography.p className="k-text-center">
                        <i>Type something to start searching</i>
                    </Typography.p>
                </div>
            )}
        </>
    )
};
