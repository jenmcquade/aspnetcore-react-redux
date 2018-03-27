const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const CompressionPlugin = require("compression-webpack-plugin");
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const extractCSS = new ExtractTextPlugin({
	filename: 'site.css',
	disable: process.env.ASPNETCORE_ENVIRONMENT === 'Development'
});
const extractSass = new ExtractTextPlugin({
	filename: "site.css",
	disable: process.env.ASPNETCORE_ENVIRONMENT === 'Development'
});

module.exports = (env) => {
	const isDevBuild = !(env && env.prod);
	// Configuration in common to both client-side and server-side bundles
	const sharedConfig = () => ({
		stats: { modules: false },
		resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		mode: isDevBuild ? "development" : "production",
		output: {
			filename: '[name].js',
			publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
		},
		module: {
			rules: [

			]
		},
		plugins: [
			extractCSS,
			extractSass,
			new CheckerPlugin(),
			new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
			new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
		]
	});

	// Configuration for client-side bundle suitable for running in browsers
	var clientBundleOutputDir = './wwwroot/dist';
	var clientBundleConfig = merge(sharedConfig(), {
		entry: {
			'main-client': './ClientApp/boot-client.tsx'
		},
		output: {
			path: path.join(__dirname, clientBundleOutputDir)
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					exclude: '/ClientApp/boot-client.tsx', 
					use: [
						{
							loader: 'ts-loader',
							options: {
								configFile: path.join(__dirname, 'tsconfig.client.json'),
								onlyCompileBundledFiles: true,
								instance: 'ts-client',
								context: __dirname,
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: extractSass.extract({
						use: [
							{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
							{
								loader: 'sass-loader',
								options: { name: '[name].css' } // compiles Sass to CSS
							},
						],
						fallback: 'style-loader'
					})
				},
				{
					test: /\.css$/,
					use: extractCSS.extract({
						use: [
							{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
						],
						fallback: 'url-loader?limit=10000',
					})
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/,
					use: {
						loader: 'url-loader',
						options: { limit: 25000 }
					}
				},
				{
					test: /(eot|woff|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
					use: {
						loader: 'file-loader',
						options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
					}
				},
				{
					test: /\.svg/,
					use: {
						loader: 'file-loader',
						options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
					}
				},
			]
		},
		plugins: [

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
			}	
		},
		devtool: "source-map"
	});

	// Configuration for server-side (prerendering) bundle suitable for running in Node
	var serverBundleConfig = merge(sharedConfig(), {
		resolve: { mainFields: ['main'] },
		entry: {
			'main-server': './ClientApp/boot-server.tsx'
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					exclude: '/ClientApp/boot-client.tsx', 
					use: [
						{
							loader: 'ts-loader',
							options: {
								configFile: path.join(__dirname, 'tsconfig.client.json'),
								onlyCompileBundledFiles: true,
								instance: 'ts-client',
								context: __dirname,
							}
						}
					]
				},
				{
					test: /\.scss$/,
					use: extractSass.extract({
						use: [
							{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
							{
								loader: 'sass-loader',
								options: { name: '[name].css' } // compiles Sass to CSS
							}
						]
					})
				},
				{
					test: /\.css$/,
					use: extractCSS.extract({
						use: [
							{ loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
						],
						fallback: 'style-loader',
					})
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/,
					use: {
						loader: 'url-loader',
						options: { limit: 25000 }
					}
				},
				{
					test: /(eot|woff|woff2|ttf|png|jpe?g|gif)(\?\S*)?$/,
					use: {
						loader: 'file-loader',
						options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
					}
				},
				{
					test: /\.svg/,
					use: {
						loader: 'file-loader',
						options: { name: '[name].[ext]', limit: 10000 } //?limit=100000'
					}
				}
			]
		},
		plugins: [
			new webpack.DllReferencePlugin({
				context: __dirname,
				manifest: require('./ClientApp/dist/vendor-manifest.json'),
				sourceType: 'commonjs2',
				name: './vendor'
			})
		],
		output: {
			libraryTarget: 'commonjs',
			path: path.join(__dirname, './ClientApp/dist')
		},
		target: 'node',
		devtool: 'source-map'
	});

	return [clientBundleConfig, serverBundleConfig];
};