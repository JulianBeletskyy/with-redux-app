const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  	cssModules: true,
  	/*cssLoaderOptions: {
	    importLoaders: 1,
	    localIdentName: "[local]",
  	},*/
  	
})

/*module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push({ test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] });
    return config;
  }
}*/