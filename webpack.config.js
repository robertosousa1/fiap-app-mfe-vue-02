// webpack.config.js
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.runtime.esm-bundler.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
  },
  plugins: [
    new (require("vue-loader").VueLoaderPlugin)(),
    new ModuleFederationPlugin({
      name: "mfe2",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.vue",
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: require("./package.json").dependencies.vue,
        },
      },
    }),
  ],
};
