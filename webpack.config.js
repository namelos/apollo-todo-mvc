import path from 'path'

export default {
  devtool: 'eval',
  entry: './src/client/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [{ test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'src') }]
  }
}