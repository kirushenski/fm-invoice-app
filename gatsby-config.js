const config = {
  // Project title. Used as SEO title and PWA name
  title: 'FM Invoice App',
  // Project short name. Used by PWA
  shortTitle: 'FM Invoice App',
  // Project description. Used in SEO meta tag and by PWA
  description: 'My solution for Frontend Mentor "Invoice App" challenge',
  // Keywords describing the project. Used in SEO meta tag
  keywords: ['gatsby', 'gatsby-starter', 'react', 'typescript', 'storybook', 'jest', 'pwa', 'graphql'],
  // Absolute deployment path (without trailing slash). Used as base URL in SEO meta tags
  baseUrl: 'https://p1t1ch-fm-invoice-app.netlify.app',
  // Site language. Added in html tag and PWA manifest
  lang: 'en',
  // Your username on Facebook. Used in SEO meta tags
  facebookUsername: 'p1t1ch',
  // Your username on Twitter (without @). Used in SEO meta tags
  twitterUsername: 'p1t1ch',
  // Path to main favicon. Recommended size: 512x512. Other sizes are generated automatically
  favicon: 'src/images/favicon.png',
  // Theme color. Used as color of device toolbar in supported browsers
  themeColor: '#252945',
  // Background color. Used as background on PWA launch screen. Recommended to make it the same as body color
  backgroundColor: '#F8F8FB',
}

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    baseUrl: config.baseUrl,
    lang: config.lang,
    facebookUsername: config.facebookUsername,
    twitterUsername: config.twitterUsername,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        start_url: '/',
        display: 'standalone',
        name: config.title,
        short_name: config.shortTitle,
        description: config.description,
        lang: config.lang,
        icon: config.favicon,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
      },
    },
    'gatsby-plugin-offline',
  ],
}
