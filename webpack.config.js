module.exports = {
    // webpack folder’s entry js — excluded from jekll’s build process.
    mode: "development",
    entry: "./webpack/entry.js",
    output: {
      // we’re going to put the generated file in the assets folder so jekyll will grab it.
      // if using GitHub Pages, use the following:
      // path: "assets/javascripts"
      path: __dirname + "/assets/js/",
      filename: "bundle.js"
    },
    module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader", // "babel-loader" is also a legal name to reference
        options: {
          presets: ["@babel/react", "@babel/preset-env"]
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['jQuery', '$']
        }
      }
      ]
    }
  };