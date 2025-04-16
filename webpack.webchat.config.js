// webpack.webchat.config.js
const path = require('path');
const webpack = require('webpack'); // Add this line

module.exports = {
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
                include: path.resolve(__dirname, 'src/app'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env'],
                        ['@babel/preset-react', { runtime: 'automatic' }],],
                    },
                },
            },
            {
                test: /\.(ts|tsx)$/, // For TypeScript and TSX files
                include: path.resolve(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                            '@babel/preset-typescript', // Ensure TypeScript support
                        ],
                    },
                },
            },
            {
                test: /\.module\.scss$/, // For .module.scss files
                include: path.resolve(__dirname, 'src/once-ui'), // Only apply to once-ui
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true, // Enable CSS modules
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@/once-ui/components': path.resolve(__dirname, 'src/once-ui/components'), // Add alias for once-ui
            '@/once-ui/hooks': path.resolve(__dirname, 'src/once-ui/hooks'), // Add alias for once-ui hooks
            '@/app/resources/config': path.resolve(__dirname, 'src/app/resources/config'), // Add alias for config
        },
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser', // Provide a browser-compatible process
        }),
    ],
    optimization: {
        minimize: false, // Disable minification
    },
};
