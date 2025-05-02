import { Search } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch";
import { searchClient, suggestIndexName } from "../services/api/algolia";
import SearchSuggestBox from "./searchSuggestBox";
import theme from "../themes/theme";

export default function SearchDialogButton() {
    const [open, setOpen] = useState(false);
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen} aria-label='search'>
                <Search />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                fullScreen={smallScreen}
                maxWidth='sm'
                sx={{
                    '.MuiDialog-container': {
                        alignItems: 'flex-start',
                    },
                }}
            >
                <DialogContent sx={{ p: 0 }}>

                    <InstantSearch
                        searchClient={searchClient}
                        indexName={suggestIndexName}
                        routing={false}
                        insights={false}
                        future={{
                            preserveSharedStateOnUnmount: true,
                        }}
                    >
                        <Configure ruleContexts={[]} />
                        <SearchSuggestBox handleClose={handleClose} />
                    </InstantSearch>

                </DialogContent>
            </Dialog>
        </>
    )
};
