module.exports = {
  entry: "./js/app.js",
  output: {
    filename: "./js/app-bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }]
  }
}