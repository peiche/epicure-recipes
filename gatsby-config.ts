import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://epicure-recipes.netlify.app/`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          api: 'modern',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  ],
}

export default config
