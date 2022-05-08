const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // エントリーポイントを決める
  entry: { 
    bundle: "./src/pages/index.js"
  },
  output: {
    // このディレクトリのdistファイルにアウトプット
    path: `${__dirname}/dist`,
    filename: "bundle.js",
  },
  // developmentモードだとソースマップが有効になる
  // productionモードだとより軽い形でアウトプットする
  mode: "production",
  resolve: {
    extensions: [".ts", ".js"]
  },
  devServer: {
    static: {
      directory: `${__dirname}/dist`,
    },
    open: true,
  },
  module: {
    rules: [
      {
        // 拡張子が.jsのファイルをコンパイルする
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react' //ReactのPresetを追加
            ],
            plugins: ['@babel/plugin-syntax-jsx'] //JSXパース用
          }
        }
        // ts-loaderを使ってコンパイルをする
        // loader: "ts-loader",
      }, { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(gif|png|jpe?g|)$/, use: 'url-loader' }, // 追加
    ]
  }
};