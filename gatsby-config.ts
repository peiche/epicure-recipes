import type { GatsbyConfig } from "gatsby"
import path from "path"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://epicure-recipes.netlify.app/`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src/data`, `images`),
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `recipes`,
        path: path.join(__dirname, `src/data`, `recipes`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tags`,
        path: path.join(__dirname, `src/data`, `tags`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: path.join(__dirname, `src/data`, `products`),
      },
    },
  ],
}

export default config
