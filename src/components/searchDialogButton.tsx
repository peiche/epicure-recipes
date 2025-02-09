import { Search } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch";
import { searchClient } from "../services/api/algolia";
import SearchSuggestBox from "./searchSuggestBox";

export default function SearchDialogButton() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <Search />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm' sx={{
                '.MuiDialog-container': {
                    alignItems: 'flex-start',
                },
                '.MuiDialog-paper': {
                    mt: 20,
                },
            }}>
                <DialogContent sx={{ p: 0 }}>

                    <InstantSearch
                        searchClient={searchClient}
                        indexName='recipe_query_suggestions'
                        routing={false}
                        insights={false}

                    >
                        <Configure ruleContexts={[]} />
                        <SearchSuggestBox handleClose={handleClose} />
                    </InstantSearch>

                </DialogContent>
            </Dialog>
        </>
    )
};
