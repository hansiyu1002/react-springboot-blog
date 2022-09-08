const path = require('path');

module.exports = {
    mode: 'development',
    entry: { app: ['./src/index.js'] },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
        ],
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"]
    },
    devServer: {
        port: 3000,
        open: true,
        hot: true
    }
};