import React from "react"
import { Box, Container, Divider, IconButton, Link, Typography } from "@mui/material";
import { Code, Favorite, GitHub } from "@mui/icons-material";
import { Link as GatsbyLink } from "gatsby";

export default function Footer() {
    return (
        <Box component='footer' className="hide-print" sx={{ py: 5}}>
            <Container maxWidth='md'>
                <Divider sx={{ mb: 5 }} />
                <Typography textAlign='center' sx={{ mb: 1 }}>
                    Written with love by{` `}
                    <Link component='a' href='https://eichefam.net' target="_blank">Paul Eiche</Link>.
                </Typography>
                <Typography textAlign='center' sx={{ mb: 1 }}>Recipies from Epicure. Pour one out for them.</Typography>
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