import React from "react"
import { Box, Container, Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box component='footer' sx={{ py: 3 }}>
            <Container maxWidth='md'>
                <Divider />
                <Typography variant='body2' textAlign='center' mt={3} mb={1}>
                    Written by{` `}
                    <Link component='a' href='https://eichefam.net' target="_blank">Paul Eiche</Link>{` `}
                    with recipes from Epicure.{` `}
                    Built with{` `}
                    <Link component='a' href='https://nextjs.org/' target="_blank">Next.js</Link>{` `}
                    and hosted on{` `}
                    <Link component='a' href='https://www.netlify.com/' target="_blank">Netlify</Link>.
                </Typography>
                <Box textAlign='center'>
                    <IconButton color='inherit' size="small" component='a' href='https://github.com/peiche/epicure-recipes' target="_blank">
                        <GitHub />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    )
}