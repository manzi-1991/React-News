const path = require('path');
const Html = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin({
//     filename: '[name].css',
//     disable: true
// });
module.exports = {
  entry:{
    app:'./src/js/root.js'
  },
  output:{
    path:path.resolve(__dirname,'bundle/src'),  //当然也可以修改这里的路径 path:path.resolve(__dirname,'build'), 
    filename:"bundle.js"												// "src/filename:"[name].js"	
  },
  module:{
    rules:[
      {
          test: /\.js$/,
          use: [
          {
            loader:'babel-loader',
            options:{														//或许可以添加plugins：['react-html-attrs'] 
              presets:["react"]									//这是babel为解析react中es6语法而安装的预设
            }
          }],
          exclude: [path.resolve(__dirname, 'node_modules')],
          include:[path.resolve(__dirname,'src')]
      },
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader'
          })
      },
    ]
  },
  plugins:[
    new Html({
      filename: '../index.html', 						//经过以上output的修改，现在的filename可以改为filename: 'index.html'
      template: 'index.html'
    }),
    new ExtractTextPlugin('[name].css')					//这里也可以根据上面output来进行修改new ExtractTextPlugin('src/1.css')		
    //if you want to pass in options, you can do so: 
    //new ExtractTextPlugin({ 
    //  filename: 'style.css' 
    //}) 
  ]
}
