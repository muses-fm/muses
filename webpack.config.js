const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const dfxJson = require("./dfx.json");

// List of all aliases for canisters. This creates the module alias for
// the `import ... from "ic:canisters/xyz"` where xyz is the name of a
// canister.
const aliases = Object.entries(dfxJson.canisters).reduce(
  (acc, [name, _value]) => {
    // Get the network name, or `local` by default.
    const networkName = process.env["DFX_NETWORK"] || "local";
    const outputRoot = path.join(
      __dirname,
      ".dfx",
      networkName,
      "canisters",
      name
    );

    return {
      ...acc,
      ["ic:canisters/" + name]: path.join(outputRoot, name + ".js"),
      ["ic:idl/" + name]: path.join(outputRoot, name + ".did.js"),
    };
  },
  {}
);

/**
 * Generate a webpack configuration for a canister.
 */
function generateWebpackConfigForCanister(name, info) {
  if (typeof info.frontend !== "object") {
    return;
  }

  return {
    mode: "development",
    devServer: {
      contentBase: './dist/frontend',
    },
    entry: {
      index: path.join(__dirname, info.frontend.entrypoint),
    },
    devtool: "source-map",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    resolve: {
      alias: {
        ...aliases,
        'vue$': 'vue/dist/vue.runtime.esm.js'
      },
      extensions: ["*", ".js", ".vue", ".json"],
    },
    output: {
      filename: "[name].js",
      path: path.join(__dirname, "dist", name),
    },

    // Depending in the language or framework you are using for
    // front-end development, add module loaders to the default
    // webpack configuration. For example, if you are using React
    // modules and CSS as described in the "Adding a stylesheet"
    // tutorial, uncomment the following lines:
    module: {
      rules: [
        { test: /\.vue$/, loader: "vue-loader" },
        { test: /\.css$/, use: ['style-loader','css-loader'] },
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true // optional
                },
              },
            },
          ],
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/frontend/public/index.html'
      })
    ],
  };
}

// If you have additional webpack configurations you want to build
//  as part of this configuration, add them to the section below.
module.exports = [
  ...Object.entries(dfxJson.canisters)
    .map(([name, info]) => {
      return generateWebpackConfigForCanister(name, info);
    })
    .filter((x) => !!x),
];
