import React from "react"
import { Box, Container, Divider, Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box component='footer' sx={{ py: 5}}>
            <Container maxWidth='md'>
                <Divider sx={{ mb: 5 }} />
                <Typography textAlign='center' sx={{ mb: 1 }}>
                    Written with love by{` `}
                    <Link component='a' href='https://eichefam.net' target="_blank">Paul Eiche</Link>.
                </Typography>
                <Typography textAlign='center' sx={{ mb: 1 }}>Recipes from Epicure. Pour one out for them.</Typography>
                <Typography textAlign='center' sx={{ mb: 1 }}>
                    Built with{` `}
                    <Link component='a' href='https://www.gatsbyjs.com/' target="_blank">Gatsby</Link>{` `}
                    and hosted on{` `}
                    <Link component='a' href='https://www.netlify.com/' target="_blank">Netlify</Link>.
                </Typography>
            </Container>
        </Box>
    )
}