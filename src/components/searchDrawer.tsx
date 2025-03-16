import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { ReactNode, useState } from "react";

interface SearchDrawerProps {
    children?: ReactNode;
}

export default function SearchDrawer(props: SearchDrawerProps) {
    const { children } = props;
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <Button
                fillMode='outline'
                className="k-mb-2"
                startIcon={<FontAwesomeIcon icon={faFilter} />}
                onClick={handleDrawerToggle}
            >
                Search Filters
            </Button>

            {open && (
                <Dialog onClose={handleClose} width={400} title='Search Filters'>
                    {children}
                </Dialog>
            )}
        </>
    )
}