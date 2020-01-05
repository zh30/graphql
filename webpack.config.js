const path = require("path");

module.exports = {
  entry: "./src/index",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
