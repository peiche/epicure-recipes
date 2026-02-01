import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchBox, useHits, useInstantSearch } from 'react-instantsearch';
import {
    Autocomplete,
    Box,
    Typography,
    IconButton,
    CircularProgress,
    TextField,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { AccessTime } from '@mui/icons-material';

export default function SearchSuggest() {
    const router = useRouter();
    const { refine } = useSearchBox();
    const { items } = useHits();
    const { status } = useInstantSearch();

    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);

    const isLoading = status === 'loading' || status === 'stalled';

    useEffect(() => {
        const timer = setTimeout(() => {
            refine(inputValue);
        }, 200);
        return () => clearTimeout(timer);
    }, [inputValue, refine]);

    const resetSearchUI = () => {
        setOpen(false);
        setInputValue('');
        refine('');
    };

    const handleSelectRecipe = (selectedTitle: string) => {
        const selectedHit = items.find((h: any) => (h.title || h.name) === selectedTitle) as any;
        if (selectedHit?.slug) {
            router.push(`/recipe/${selectedHit.slug}`);
        } else {
            handleKeywordSearch(selectedTitle);
        }
    };

    const handleKeywordSearch = (term: string) => {
        if (!term.trim()) return;
        router.push(`/search?recipe[query]=${encodeURIComponent(term.trim())}`);
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleKeywordSearch(inputValue);
    };

    return (
        <Box component="form" onSubmit={onFormSubmit} sx={{ width: 'auto' }}>
            <Autocomplete
                freeSolo={items.length > 0 || isLoading}
                filterOptions={(x) => x}
                open={open && inputValue.length > 0}
                onOpen={() => { if (inputValue.length > 0) setOpen(true); }}
                onClose={() => setOpen(false)}
                options={items.map((hit: any) => hit.title || hit.name || '')}
                inputValue={inputValue}
                onInputChange={(event, newInputValue, reason) => {
                    if (reason === 'input') {
                        setInputValue(newInputValue);
                        setOpen(newInputValue.length > 0);
                    } else if (reason === 'reset' && newInputValue === '') {
                        setInputValue('');
                    }
                }}
                onChange={(event, value, reason) => {
                    if (reason === 'selectOption' && value) {
                        handleSelectRecipe(value as string);
                    }
                }}
                noOptionsText={
                    isLoading
                        ? "Searching..."
                        : inputValue.length < 4
                            ? "Type more to see suggestions"
                            : <>No recipes found.<br />Press Enter to search.</>
                }
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: '12px',
                            mt: 1,
                            boxShadow: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                            '& .MuiAutocomplete-noOptions': {
                                p: 2,
                                textAlign: 'center',
                                color: 'text.secondary',
                                fontSize: '0.9rem',
                            }
                        }
                    },
                    popper: {
                        sx: {
                            minWidth: '300px',
                            display: inputValue.length === 0 ? 'none' : 'block'
                        }
                    }
                }}
                renderInput={(params) => {
                    const { InputProps, inputProps, ...rest } = params;
                    return (
                        <TextField
                            {...rest}
                            placeholder="Search recipes..."
                            variant="outlined"
                            slotProps={{
                                input: {
                                    ...InputProps,
                                    inputProps: { ...inputProps, type: 'text' },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'text.secondary', ml: 1 }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isLoading ? (
                                                <CircularProgress size={16} color="inherit" />
                                            ) : (
                                                inputValue.length > 0 && (
                                                    <IconButton size="small" onClick={resetSearchUI} sx={{ p: 0.5 }}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                )
                                            )}
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        borderRadius: '50px !important',
                                        bgcolor: 'background.paper',
                                        width: { sm: 180, md: 200, lg: 250 },
                                        height: 40,
                                        fontSize: '0.95rem',
                                        mr: 1,
                                        pr: '12px !important',
                                        '&:hover fieldset': { borderColor: 'divider' },
                                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                    }
                                }
                            }}
                        />
                    );
                }}
                renderOption={(props, option) => {
                    const hit = items.find(h => (h.title || h.name) === option) as any;
                    const { key, ...optionProps } = props as any;
                    return (
                        <Box component="li" key={key || hit?.objectID || option} {...optionProps}>
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{option}</Typography>
                                {hit?.totalTime && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.7rem' }}>
                                        <AccessTime sx={{ fontSize: 12, mr: 0.5 }} />
                                        {hit.totalTime}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    );
                }}
            />
        </Box>
    );
}
