import React from "react"
import { Box, Container, Divider, Grid, IconButton, Link, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'text.primary',
                color: 'background.default',
                pt: 8,
                pb: 4,
                mt: 'auto',
            }}
        >
            <Container maxWidth='xl'>
                <Typography variant='body2' textAlign='center'>
                    Written by{` `}
                    <Link component='a' href='https://github.com/peiche' target="_blank">Paul Eiche</Link>{` `}
                    with recipes from Epicure.{` `}
                    Built with{` `}
                    <Link component='a' href='https://nextjs.org/' target="_blank">Next.js</Link>{` `}
                    and hosted on{` `}
                    <Link component='a' href='https://www.netlify.com/' target="_blank">Netlify</Link>.
                </Typography>
                <Box textAlign='center' sx={{ mt: 2 }}>
                    <IconButton color='inherit' size="small" component='a' href='https://github.com/peiche/epicure-recipes' target="_blank" aria-label="Epicure Recipes on GitHub">
                        <GitHub />
                    </IconButton>
                </Box>
            </Container>
        </Box>
    )
}