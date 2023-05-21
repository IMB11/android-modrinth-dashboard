const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint-disable-next-line no-unused-vars
  configureWebpack: (config) => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          PACKAGE_CONTENTS: JSON.stringify(require("./package.json")),
        }),
      ],
    };
  },
});
