import * as React from "react"
import { Link as GatsbyLink, HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import { Link, Typography } from "@mui/material"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}

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
