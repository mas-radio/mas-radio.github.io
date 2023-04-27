const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";

module.exports = (env, argv) => {

  let conf = {
    mode: 'production',
    entry: {
      main: './src/main.js',
      radioHosting: './src/components/radio-player/radiohosting-player.js',
      footer: './src/components/footer/mas-radio-footer-component.js',
      header: './src/components/header/header-component.js',
    },
    target: ['web', 'es5'],
    devServer: {
      port: 3000,
      watchFiles: {
        paths: ['src/**/*.*'],
        options: {
          ignored: '.*'
        }
      }
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!.git'],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "recursos/**/*",
            context: "src"
          },
          {
            from: "**/*.(svg|css|ico)",
            to: "[path][name][ext]",
            context: "src"
          },
        ],
      }),

    ].concat(
      devMode ? [] : [new MiniCssExtractPlugin()],
    ),
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: {"firefox": "34"}}]
              ],
            }
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "www"),
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
      compareBeforeEmit: true,
    },
    watchOptions: {
      "aggregateTimeout": 200
    }
  };
  if (argv.mode === 'development') {
    conf.devtool = 'source-map';
  }

  return conf;
}
