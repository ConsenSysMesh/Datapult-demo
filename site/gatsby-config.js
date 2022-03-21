module.exports = {
  siteMetadata: {
    title: `Datapult`,
    description: `A free social media image sharing utility built on Web3 decentralized storage`,
    author: `@TeamZeroDev`,
    siteUrl: `https://datapult.site`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Datapult Web3 Utility`,
        short_name: `datapult`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/datapult-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
