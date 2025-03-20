import * as React from "react"
import Layout from "../components/layout"
import Wrapper from "../components/wrapper"
import SEO from "../components/seo"
import { Typography } from "@progress/kendo-react-common"
import Link from "next/link"

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <SEO title='Not Found' />
      <Wrapper>
        <Typography.h1 className="k-h3">Page Not Found</Typography.h1>
        <Typography.p className="k-mb-3">
          Not all who wander are lost, but you definitely are.
        </Typography.p>
        <Typography.p>
          <Link href='/'>Go Home</Link>
        </Typography.p>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
