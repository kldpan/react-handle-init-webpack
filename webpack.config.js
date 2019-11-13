// 引入path，path是node原生模块,用来拼接路径
const path =require("path");

// cnpm i html-webpack-plugin -D下载html打包插件，并引入该插件
const htmlWebpackPlugin=require("html-webpack-plugin");
// cnpm i webpack@3.6.0 -D下载局部webpack模块，并引入webpack
const webpack = require('webpack');


module.exports={
    // 1.配置出入口文件
    entry:{
        app:path.resolve(__dirname,"./src/main.js")
    },
    // 执行webpack命令会自动生成dist目录
    output:{
        // 插件按照这个路径文件夹位置生成index.html文件
        path:path.resolve(__dirname,"./dist"),
        filename:"bundle.js",
        //配置完插件使用这个路径,
        filename:"js/bundle.js"
    },
    // 2.配置插件
    plugins:[
        new htmlWebpackPlugin({
        title:"React", //可是设置title
        filename:"index.html",  //可以设置生成html文件名字,file生成目录主要根据 出口文件的path走
        template:"./src/index.html"   //也可预先配置一个html模板
    	}),
         // 配置全局jquery,配置钱需要下载jquery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    // 3.配置loader,注意对照版本(下载下面3个插件)

        //babel_loader ES6转义
        //cnpm i  @babel/core babel-loader @babel/preset-env @babel/preset-react -D

        //css,scss_loader
        //cnpm i style-loader@1.0.0 css-loader@3.2.0 sass-loader@7.1.0 node-sass@4.13.0 -D

        //配置图片解析loader
        // 
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(js|jsx)$/,   //.vue
                use: {
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/env", "@babel/react"]
                    }
                }
            },
            {
                //将css文件匹配到先解析css 再将css插入到style中，写法从右往左写
                test:/\.(png|jpg|gif|woff|svg|eot|woff2|ttf)$/,
                    // 8*1024 多少字节限制8K以上直接输出文件，以下的base64
                use:{
                    loader:'url-loader',
                    options: {
                        limit: 8192,   // 小于 8kb的图片转换为base64编码,减少http请求
                    }
                }
            }
        ]
    },
    // 设置省略后缀和目录别名
    resolve: {
        //设置可以省略的后缀
        extensions: ['.js','.json'],
        alias: {
            '@': path.resolve(__dirname, "src")
        }
    },
    // 配置热更新
    // 下载模块 cnpm i webpack-dev-server@2 -D
    // 修改package.json 下面代码,scripts负责配置启动命令
    // "scripts": {
    //     "start": "webpack-dev-server"
    // }

    // 配置代理
    devServer: {
        // 配置主机 
        host:"0.0.0.0",
        port:"8899",
        proxy:{
            '/apis': { //url里面要拼接进去
                target:"https://cnodejs.org" , // 需要代理接口域名
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                '^/apis': '' //需要rewrite的,
                }
            }
        },    
    }
}