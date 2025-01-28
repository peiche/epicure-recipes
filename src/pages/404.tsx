import * as React from "react"
import { Link as GatsbyLink, HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Link, Typography } from "@mui/material"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Typography component='h1' variant='h4' mb={3}>Page Not Found</Typography>
      <Typography mb={3}>
        Not all who wander are lost, but you definitely are.
      </Typography>
      <Typography>
        <Link component={GatsbyLink} to='/'>Go Home</Link>
      </Typography>

    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
