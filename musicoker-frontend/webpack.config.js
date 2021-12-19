const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    mode: 'development',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
}