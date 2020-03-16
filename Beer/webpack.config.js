module.exports = {
  module: {
    rules: [
      {
        test: /\.(mp4)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'video/mp4',
            },
          },
        ],
      },
    ],
  },
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};