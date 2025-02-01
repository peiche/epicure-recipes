import * as React from "react"
import NextLink from 'next/link'
import Layout from "../components/layout"
import { Link, Typography } from "@mui/material"
import Wrapper from "../components/wrapper"
import SEO from "../components/seo"

const NotFoundPage: React.FC = () => {
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

export default NotFoundPage
