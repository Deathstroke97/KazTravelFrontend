const withSass = require('@zeit/next-sass');
module.exports = withSass({
  distDir: 'build',
  postcssLoaderOptions: { parser: true, autoprefixer: true }
})
