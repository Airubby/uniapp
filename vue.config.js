const path = require("path");
const chalk = require('chalk')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')   //prerender-spa-plugin  这个在自动部署上面报错
const TerserPlugin = require('terser-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']
module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出主文件名称
    indexPath: './index.html',
    //baseUrl: process.env.NODE_ENV === "production" ? "./" : "/"
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	// assetsDir: 'static',
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        //  // 配置别名
        // config.resolve.alias.set("@", path.join(__dirname, "src"))

        /**
         * 删除懒加载模块的prefetch，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
         */
        config.plugins.delete('prefetch')
        config.plugins.delete('preload');
         // 压缩代码
        config.optimization.minimize(true);
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
    },
    //公共代码抽离
    configureWebpack: config => {
        const myConfig = {}
        if (isProduction) {
            // 1. 生产环境npm包转CDN，externals定义的部分不需要Webpack打包编译
            myConfig.externals = externals
            // 2. 使用预渲染，在仅加载html和css之后即可显示出基础的页面，提升用户体验，避免白屏，但在自动部署上面报错
            myConfig.plugins = []
            //3.js代码整合
            let optimization= {
                //去掉打印console信息
                minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })],
                //整合代码
                splitChunks: {
                    cacheGroups: {
                        vendor:{
                            chunks:"all",
                            test: /node_modules/,
                            name:"vendor",
                            minChunks: 1,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority:100,
                        },
                        common: {
                            chunks:"all",
                            test:/[\\/]src[\\/]js[\\/]/,
                            name: "common",
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority:60
                        },
                        styles: {
                            name: 'styles',
                            test: /\.(le|sa|sc|c)ss$/,
                            chunks: 'all',
                            enforce: true,
                        },
                        runtimeChunk: {
                            name: 'manifest'
                        }
                    } 
                },
                
            }
            Object.assign(config, {
                optimization
            })
            // 4. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip && myConfig.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            )

        }
        if (!isProduction) {
            /**
             * 关闭host check，方便使用ngrok之类的内网转发工具
             */
            myConfig.devServer = {
                disableHostCheck: true
            }
            let optimization={
                minimizer:[
                    new TerserPlugin({
                        cache: true,
                        // 将多线程关闭  webpack会92%卡住的问题
                        parallel: false
                    })
                ]
            }
            Object.assign(config, {
                optimization
            })
        }
        return myConfig
        // Object.assign(config, {
        //     // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //         }
        //     }
        // });
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            //为每个css引入公共需要引入的样式
            // less:{
            //     data:`@import "@/assets/public.less"`
            // }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: false, 
        compress: false, // 开启压缩
        overlay: {
            warnings: true,
            errors: true
        },
        host: '0.0.0.0',
        port: 8083,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            '/ISmac/ismacsite': {
            target: 'http://192.168.16.6:8090', // 你接口的域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                ws:false,
                pathRewrite:{
                '^/ISmac/ismacsite':'/ISmac/ismacsite'
                }
		    }
        },
        before: app => {
        }
    },
    // 第三方插件配置
    pluginOptions: {}
}