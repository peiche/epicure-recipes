import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@progress/kendo-react-buttons";
import { Typography } from "@progress/kendo-react-common";
import { Drawer, DrawerNavigation } from "@progress/kendo-react-layout";
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
                <Drawer expanded={open} onOverlayClick={handleClose}>
                    <DrawerNavigation>
                        <div className="k-p-3 k-pb-0">
                            <Typography.h2 className="k-h5 !k-font-normal !k-mb-0">Search Filters</Typography.h2>
                        </div>
                        <hr className="k-hr" />
                        <div className="k-p-3 k-pt-0">
                            {children}
                        </div>
                    </DrawerNavigation>
                </Drawer>
            )}
        </>
    )
}