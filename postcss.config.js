module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-font-family-system-ui'),
    require('cssnano')({
      preset: 'default',
    })
  ]
}