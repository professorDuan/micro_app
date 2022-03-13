const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8001;

module.exports = {
  outputDir: 'dist',//打包后的目录
  assetsDir: 'static',//打包后的静态资源目录
  filenameHashing: true,//打包后生成的文件带有hash值 
  //静态资源路径的前缀(生产模式下一般都是CDN的)
  publicPath: 'http://localhost:8001',
  //本地启动服务的配置信息
  devServer: { 
    //contentBase用来指定被访问的HTML页面所在的路径(默认是根路径)，这里最终打包到dist目录下(dist目录下也会生成一个html文件)
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    disableHostCheck: true, 
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      libraryTarget: 'umd',
      filename: 'vue2.js',
      library: 'vue2',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
