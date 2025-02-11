import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useState } from "react";
import { SuggestHit } from "../interfaces/SuggestHit";
import { Hit } from "algoliasearch";
import { searchClient, suggestIndexName } from "../services/api/algolia";
import { Box, IconButton, InputBase, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import NextLink from "next/link";
import { isElementVisibleInScrollableDiv } from "../utils/utils";

interface SearchBoxProps {
    handleClose: () => void;
}

export default function SearchSuggestBox({ handleClose }: SearchBoxProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [hits, setHits] = useState<SuggestHit[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.key;
        const isLetter = /^[a-z]$/i.test(event.key);
        const isNumber = /^[0-9]$/i.test(event.key);
        const isDelete = key === 'Backspace' || key === 'Delete';
        if (isLetter || isNumber || isDelete) {
            setSelectedIndex(-1);
        }
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') {
            event.preventDefault();
        }

        if (hits.length > 0) {
            switch (key) {
                case 'ArrowUp':
                    console.log('up');
                    if (selectedIndex === 0) {
                        setSelectedIndex(-1);
                    } else {
                        let i = selectedIndex - 1;
                        if (i <= -1) {
                            i = hits.length - 1;
                        }
                        setSelectedIndex(i);
                    }

                    break;
                case 'ArrowDown':
                    if (selectedIndex === hits.length - 1) {
                        setSelectedIndex(-1)
                    } else {
                        let i = selectedIndex + 1;

                        if (i >= hits.length) {
                            i = 0;
                        }
                        setSelectedIndex(i);
                    }

                    break;
            }
        }

        if (key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            if (selectedIndex !== -1) {
                const query = hits[selectedIndex].query;
                router.push(`/search/?s=${query}`);
                handleClose();
            } else if (inputValue.length > 0) {
                router.push(`/search/?s=${inputValue}`);
                handleClose();
            }
        }
    };

    useEffect(() => {
        const list = document.getElementById('search-suggest-hits-list');
        if (list) {
            const item = list.querySelector('.Mui-selected');
            if (item && !isElementVisibleInScrollableDiv(item, list)) {
                item.scrollIntoView();
            }
        }
    }, [selectedIndex]);

    useEffect(() => {
        searchClient
            .search([{
                indexName: suggestIndexName,
                params: {
                    query: inputValue,
                },
            }])
            .then(({ results }: any) => {
                const typedHits = results[0].hits?.map((hit: Hit) => ({
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
        <Box>
            <Box
                display='flex'
                gap={2}
                alignItems='center'
                p={2}
            >
                <Search />
                <InputBase
                    name='s'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Search...'
                    autoFocus
                    autoComplete="off"
                    fullWidth
                    onKeyDown={handleInputKeyDown}
                />
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </Box>

            {hits.length > 0 && (
                <List
                    id='search-suggest-hits-list'
                    sx={(theme) => ({
                        maxHeight: {
                            xs: 'calc(100vh - 72px)',
                            sm: 'calc(100vh - 72px - 32px - 32px)'
                        },
                        overflowY: 'auto',
                        borderTop: `1px solid ${theme.palette.divider}`,
                    })}
                >
                    {hits.map((hit, index) => (
                        <ListItem key={index} sx={{
                            py: 0,
                            my: 1,
                        }}>
                            <ListItemButton
                                selected={selectedIndex === index}
                                component={NextLink}
                                href={`/search/?s=${hit.query}`}
                                onClick={handleClose}
                                sx={(theme) => ({
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: '4px',
                                })}
                            >
                                <ListItemText sx={{
                                    'em': {
                                        fontStyle: 'normal',
                                        textDecoration: 'underline',
                                    },
                                }}>
                                    <span dangerouslySetInnerHTML={{ __html: hit._highlightResult.query.value }} />
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
};
