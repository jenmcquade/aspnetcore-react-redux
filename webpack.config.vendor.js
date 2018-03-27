const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const extractCSS = new ExtractTextPlugin({
	filename: 'vendor.css',
	disable: process.env.ASPNETCORE_ENVIRONMENT === 'Development'
});
const extractSass = new ExtractTextPlugin({
	filename: 'vendor.css',
	disable: process.env.ASPNETCORE_ENVIRONMENT === 'Development'
});
module.exports = (env) => {
	const isDevBuild = !(env && env.prod);

	const sharedConfig = {
		stats: { modules: false },
		resolve: {
			alias: {
				'masonry': 'masonry-layout',
				'isotope': 'isotope-layout'
			}
		},
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: extractSass.extract({
						use: [
							{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
							{
								loader: 'sass-loader',
								options: { name: '[name].css'} // compiles Sass to CSS
							}
						]
					})
				},
				{
					test: /\.css$/,
					use: extractCSS.extract(
						{
							use: {
								loader: 'file-loader?name=[name].css',
							}
						}
					)
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/,
					use: {
						loader: 'url-loader',
						options: { name: '[name].[ext];', limit: 25000 }
					}
				},
				{
					test: /(eot|woff|svg|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
					use: {
						loader: 'file-loader',
						options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
					}
				}
			]
		},
		entry: {
			vendor: [
				'bootstrap',
				'bootstrap/dist/css/bootstrap.css',
				path.join(__dirname, 'ClientApp', 'sass', 'font-awesome.scss'),
				'domain-task',
				'event-source-polyfill',
				'history',
				'jquery',
				'isotope-layout',
				'react',
				'react-dom',
				'react-router',
				'react-redux',
				'redux',
				'redux-thunk',
				'react-router-dom',
				'react-router-redux',
			],
		},
		output: {
			filename: '[name].js',
			library: '[name]_[hash]',
		},
		plugins: [
			extractCSS,
			extractSass,
			new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
			new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"',
			}),
		]
	};
	const clientBundleOutputDir = './wwwroot/dist';
	const clientBundleConfig = merge(sharedConfig, {
		output: { path: path.join(__dirname, 'wwwroot', 'dist') },
		plugins: [
			new webpack.DllPlugin({
				path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
				name: '[name]_[hash]'
			}),
		].concat(isDevBuild ? [
			// Plugins that apply in development builds only
		] : [
			// Plugins that apply in production builds only
			new CompressionPlugin({
				asset: "[path].gz[query]",
				algorithm: "gzip",
				test: /\.js$|\.css|\.svg$/,
				threshold: 10240,
				minRatio: 0.8
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
			})
		]),
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						chunks: "all"
					}
				}
			},
		},
		devtool: "source-map"
   });

  const serverBundleConfig = merge(sharedConfig, {
    target: 'node',
    resolve: { mainFields: ['main'] },
    output: {
        path: path.join(__dirname, 'ClientApp', 'dist'),
        libraryTarget: 'commonjs2',
    },
    module: {
			rules: [
				
			],  
    },
    entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
		plugins: [
      new webpack.DllPlugin({
          path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
          name: '[name]_[hash]'
      }),
		],
		devtool: "source-map"
  });

  return [clientBundleConfig, serverBundleConfig];
};
