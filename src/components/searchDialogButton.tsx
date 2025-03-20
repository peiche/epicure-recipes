import { useState } from "react";
import { Configure, InstantSearch } from "react-instantsearch";
import { searchClient, suggestIndexName } from "../services/api/algolia";
import SearchSuggestBox from "./searchSuggestBox";
import { Button } from "@progress/kendo-react-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@progress/kendo-react-dialogs";

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
            <Button
                size='large'
                fillMode='flat'
                rounded='full'
                startIcon={<FontAwesomeIcon icon={faSearch} />}
                onClick={handleClickOpen}
            />
            {open && (
                <Dialog onClose={handleClose}>

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

                </Dialog>
            )}
        </>
    )
};
