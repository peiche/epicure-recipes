import React from "react"
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import NextLink from "next/link";
import ModeToggle from "./modeToggle";
import SearchDialogButton from "./searchDialogButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
    return (
        <AppBar position="static" variant='outlined' elevation={0} color="default" sx={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
        }}>
            <Container maxWidth='lg'>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        component={NextLink}
                        href='/'
                        color='inherit'
                        fontWeight='bold'
                        sx={{ textDecoration: 'none' }}
                    >Epicure Recipes</Typography>

                    <Box display='flex' gap={1}>
                        <Button
                            component='a'
                            href='https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD'
                            target="_blank"
                            startIcon={<FontAwesomeIcon icon={faPaypal} />}
                            sx={{
                                bgcolor: '#ffc439',
                                color: '#2C2E2F',
                                borderRadius: '99px',
                                px: 2,
                                textTransform: 'none',
                            }}
                        >Donate</Button>
                        <ModeToggle />
                        <SearchDialogButton />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
