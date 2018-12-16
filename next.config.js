// const withCSS = require('@zeit/next-css')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
// module.exports = withCSS({
//   	cssModules: true,
//   	cssLoaderOptions: {
// 	    importLoaders: 1,
// 	    localIdentName: "[local]",
//   	},
// })

module.exports = {
  webpack: config => {
    config.node = {
      fs: 'empty'
    }

    return config
  },
  plugins: [
  	new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}