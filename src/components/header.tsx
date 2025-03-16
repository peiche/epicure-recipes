import React from "react"
import SearchDialogButton from "./searchDialogButton";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";
import { Typography } from "@progress/kendo-react-common";
import Link from "next/link";

export default function Header() {
    return (
        <AppBar>
            <AppBarSection>
                <Link className="k-link" href='/'>
                    <Typography.h1 className="k-h5" style={{ marginBottom: 0 }}>Epicure Recipes</Typography.h1>
                </Link>
            </AppBarSection>
            <AppBarSpacer />
            <AppBarSection className="k-gap-sm">
                <a
                    href='https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD'
                    target="_blank"
                    className="k-button k-button-md k-button-solid k-button-solid-base k-rounded-full"
                    style={{
                        backgroundColor: '#ffc439',
                        color: '#2C2E2F',
                        border: 0,
                        paddingLeft: 12,
                        paddingRight: 12
                    }}>Donate</a>
                <SearchDialogButton />
            </AppBarSection>
        </AppBar>
    )
}
