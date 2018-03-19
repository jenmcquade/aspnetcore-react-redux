const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');
const extractSass = new ExtractTextPlugin({
    filename: 'site.css',
    disable: process.env.ASPNETCORE_ENVIRONMENT === 'Development'
});

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // replace extractCSS with these two extractors
    const extractSiteLess = new ExtractTextPlugin('site.css');
    const extractBootstrapLess = new ExtractTextPlugin('bootstrap.css');

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: { modules: false },
        resolve: { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] },
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'babel-loader' },
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' }
            ]
        },
        plugins: [new CheckerPlugin()]
    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/boot-client.tsx' },
        module: {
            rules: [
                { test: /\.ts/, include: '/ClientApp/components/', loader: 'tsx-loader' },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        // use style-loader in development
                        fallback: 'style-loader',
                        use: [
                            { loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' },     
                            {
                                loader: 'sass-loader' // compiles Sass to CSS
                            }
                        ] 
                    })
                },
                // use this rule to compile bootstrap.css
                // it limits its input to bootstrap.less
                // don't forget to include the less-loader
                { 
                    test: /bootstrap\.less$/, 
                    use: extractBootstrapLess.extract({
                        use: [
                            { loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' }, 
                            { loader: 'less-loader' }
                        ]
                    }),
                }, 
                { 
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/, 
                    use: 'url-loader?limit=25000' 
                }
            ]
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            extractSass,
            extractBootstrapLess,
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.tsx' },
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
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};
