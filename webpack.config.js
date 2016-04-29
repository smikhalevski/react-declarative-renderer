module.exports = {
  entry: {
    index: './src/main/index.js'
  },
  output: {
    path: './target/out',
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  externals: [
    {
      'react': true
    }
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'}
    ]
  }
};
