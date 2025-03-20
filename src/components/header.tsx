import React from "react"
import SearchDialogButton from "./searchDialogButton";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";
import { Typography } from "@progress/kendo-react-common";
import Link from "next/link";
import ModeToggle from "./modeToggle";

export default function Header() {
    return (
        <AppBar themeColor="inherit" className="appbar-flat">
            <AppBarSection>
                <Link className="k-link" href='/'>
                    <Typography.h1 className="k-h5" style={{ marginBottom: 0 }}>Epicure Recipes</Typography.h1>
                </Link>
            </AppBarSection>
            <AppBarSpacer />
            <AppBarSection className="k-gap-sm">
                <ModeToggle />
                <SearchDialogButton />
            </AppBarSection>
        </AppBar>
    )
}
