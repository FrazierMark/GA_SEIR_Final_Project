const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\bmapbox-gl-csp-worker.js\b/i,
                use: { loader: 'worker-loader' }
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['my-custom-babel-preset'],
            ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js']
        }
    },      
    plugins: [new MiniCssExtractPlugin()],
};