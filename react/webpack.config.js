const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: { path: ['./src/index.jsx'] },
  //最终生成的打包JS、CSS、index.html都在dist目录下(主应用中通过http://localhost:8083就会拿到这个html里的内容)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react.js',
    library: 'react',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    //output中的publicPath会给打包生成的html文件里面引用资源路径中添加前缀(可以去index.html查看所有引入的JS、CSS都会加上publicPath)
    //以EHI项目为例,分为两个配置文件,开发环境时publicPath直接是/(其实开发环境时dist只在内存里存在),生产环境时publicPath是CDN地址
    //不加默认就是/,那么当从主应用中打开这个子应用时,子应用资源会去主应用的根路径下查找,因此这里需要写成子应用的域名
    publicPath:'http://localhost:8003/'
  },
  module: {
    rules: [
      {
        test: /\.js(|x)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(cs|scs)s$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: 'file-loader'
      }
    ]
  },
  optimization: {
    splitChunks: false,
    minimize: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    }) 
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    //contentBase代表html的相对目录,设置成跟出口文件目录一致就行(但我看不设置也行)
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8003,
    historyApiFallback: true,
    hot: true
  }
}
