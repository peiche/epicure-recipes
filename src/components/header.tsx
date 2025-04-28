import React from "react"
import { AppBar, Box, Button, Container, Icon, IconButton, SvgIcon, Toolbar, Typography } from "@mui/material";
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
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                    }}>
                        <IconButton
                            component={NextLink}
                            href='/'
                            aria-label='Epicure Recipes'
                        >
                            <SvgIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" id="whisk-1">
                                    <g fill="currentColor" transform="translate(6 6) scale(0.75)">
                                        <path fill="currentColor" d="M41.807,6.194c-2.059-2.059-4.796-3.193-7.707-3.193c-2.912,0-5.648,1.134-7.707,3.193 c-3.212,3.211-9.451,17.431-10.234,19.234l-12.83,12.83c-1.768,1.769-1.768,4.646,0,6.414C4.185,45.528,5.324,46,6.535,46 c1.212,0,2.352-0.472,3.207-1.329l12.824-12.823c1.808-0.747,15.462-6.462,19.241-10.24C46.056,17.358,46.056,10.443,41.807,6.194z M36.092,15.894c-3.25,3.25-12.836,10.356-15.483,12.301l-0.799-0.799c2.031-2.723,9.551-12.742,12.296-15.488 c3.784-3.784,7.493-5.095,8.286-4.3C41.186,8.401,39.875,12.111,36.092,15.894z M27.807,7.608c1.681-1.681,3.915-2.607,6.293-2.607 c1.252,0,2.462,0.263,3.575,0.752c-2.227,0.747-4.801,2.56-6.982,4.741c-2.801,2.801-10.03,12.414-12.312,15.472l-0.192-0.192 C20.276,21.006,25.356,10.057,27.807,7.608z M22.233,29.819l-0.194-0.194c2.993-2.2,12.171-9.022,15.466-12.318 c2.178-2.177,3.989-4.747,4.738-6.972c1.421,3.258,0.809,7.197-1.852,9.858C37.141,23.446,25.097,28.617,22.233,29.819z"></path>
                                    </g>
                                </svg>
                            </SvgIcon>
                        </IconButton>
                        <Typography
                            component={NextLink}
                            href='/'
                            color='inherit'
                            fontWeight='bold'
                            sx={{
                                textDecoration: 'none',
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                },
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >Epicure Recipes</Typography>
                    </Box>

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
                        >
                            Donate
                        </Button>
                        <ModeToggle />
                        <SearchDialogButton />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
