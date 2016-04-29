module.exports = {
  entry: {
    index: './src/main/index.js'
  },
  output: {
    path: './target/out',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'}
    ]
  }
};
