// webpack.webchat.config.js
const path = require('path');
const webpack = require('webpack'); // Add this line

module.exports = {
    cache: false,
    entry: './src/app/lib/WebchatEmbed.js',
    output: {
        path: path.resolve(__dirname, 'src/public/embed'),
        filename: 'webchat.js',
        library: 'renderWebchat',
        libraryTarget: 'umd',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env'],
                        ['@babel/preset-react', { runtime: 'automatic' }],],
                    },
                },
            },
            {
                test: /\.(ts|tsx)$/,
                include: path.resolve(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.module\.scss$/,
                include: path.resolve(__dirname, 'src/once-ui'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:5]', // Optional, but can help in debugging
                                exportLocalsConvention: 'camelCase', // Optional, but can be useful
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@/once-ui/components': path.resolve(__dirname, 'src/once-ui/components'),
            '@/once-ui/hooks': path.resolve(__dirname, 'src/once-ui/hooks'),
            '@/app/resources/config': path.resolve(__dirname, 'src/app/resources/config'),
        },
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    optimization: {
        minimize: false,
    },
};
