const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('vendor.css');

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
                { test: /\.(png|woff|woff2|eot|ttf)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                'bootstrap',
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
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            })
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: path.resolve('css-loader?importLoaders=1'), 
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|svg)$/,
                    use: {
                        loader: path.resolve('file-loader?name=[name].[ext]'),
                    }
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: 'svg-url-loader',
                        options: {
                            encoding: 'base64',
                            limit: 1024
                        }
                    }
                },
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
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
                {
                    test: /\.css$/,
                    loader: path.resolve('css-loader?importLoaders=1'), 
                },
                {
                    test: /\.svg/,
                    use: {
                        loader: 'svg-url-loader',
                        options: {
                            encoding: 'base64',
                            limit: 1024
                        }
                    }
                },
            ],  
        },

        entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
};
