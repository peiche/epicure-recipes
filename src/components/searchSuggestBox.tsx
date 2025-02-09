import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { SuggestHit } from "../interfaces/SuggestHit";
import { SearchParamsObject } from "algoliasearch";
import { searchClient } from "../services/api/algolia";
import { Autocomplete, Box, IconButton, InputBase } from "@mui/material";
import { Close, Search } from "@mui/icons-material";

interface SearchBoxProps {
    handleClose: () => void;
}

export default function SearchSuggestBox({ handleClose }: SearchBoxProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [hits, setHits] = useState<SuggestHit[]>([]);

    const autocompleteOptions = hits.map((hit) => {
        return hit.query;
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAutocompleteChange = (_event: SyntheticEvent<Element, Event>, value: string) => {
        handleClose();
        router.push(`/search/?s=${value}`);
    };

    useEffect(() => {
        const searchParams: SearchParamsObject = {
            query: inputValue,
        };

        searchClient
            .search([{ indexName: 'recipe_query_suggestions', params: searchParams }])
            .then(({ results }: any) => {
                const typedHits = results[0].hits?.map((hit: any) => ({
                    ...hit,
                    _highlightResult: hit._highlightResult || {},
                })) as SuggestHit[];
                setHits(typedHits);
            })
            .catch((error) => {
                console.error("Algolia search error:", error);
            });
    }, [inputValue]);

    return (
        <Box component='form' action='/search'>
            <Autocomplete
                options={autocompleteOptions}
                filterOptions={(options, _state) => options}
                freeSolo
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                    <Box
                        display='flex'
                        gap={2}
                        alignItems='center'
                        p={2}
                        ref={params.InputProps.ref}
                    >
                        <Search />
                        <InputBase  
                            {...params}
                            name='s'
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder='Search...'
                            autoFocus
                        />
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Box>
                )}
            />
        </Box>
    )
};
