const webpack = require('webpack');
const path = require('path');

const devServerPort = 3000;

let outputFileName = 'stickies',
    env = process.env.WEBPACK_ENV,
    plugins = [],
    outPutConfig = {},
    outputFile,
    devServerConfig;

//Default plugins
plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new webpack.NamedModulesPlugin());

//Environment specific settings
if (env === 'prod') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false
        }
    }));
    outputFile = outputFileName + '.min.js';
} else {
    outputFile = outputFileName + '.js';
}

//Output configuration
outPutConfig.filename = outputFile;
outPutConfig.path = path.resolve(__dirname, 'dist');
outPutConfig.publicPath = '/dist/';
outPutConfig.hotUpdateMainFilename = '[hash].json';
outPutConfig.library = 'stickies';
outPutConfig.libraryTarget = 'umd';
outPutConfig.libraryExport = 'default';

//Dev Server configuration
devServerConfig = {
    port: devServerPort,
    publicPath: '/dist/',
    hotOnly: true,
    open: true,
    openPage: './index.html',
    public: 'localhost:' + devServerPort,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    clientLogLevel: 'info',
    stats: {
        colors: true,
        assets: true,
        warnings: true
    }
};

const config = {
    entry: {
        "stickies": './src/app.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            Root: path.resolve(__dirname, 'src/')
        }
    },
    output: outPutConfig,
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: plugins,
    devServer: devServerConfig
};

module.exports = config;