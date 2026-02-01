import * as React from "react"
import NextLink from 'next/link'
import Layout from "../components/ui/layout"
import { Link, Typography } from "@mui/material"
import Wrapper from "../components/layout/wrapper"
import SEO from "../components/layout/seo"

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title='Not Found' />
      <Wrapper>
        <Typography component='h1' variant='h4' mb={3}>Page Not Found</Typography>
        <Typography mb={3}>
          Not all who wander are lost, but you definitely are.
        </Typography>
        <Typography>
          <Link component={NextLink} href='/'>Go Home</Link>
        </Typography>
      </Wrapper>
    </Layout>
  )
}
