const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 打包分析工具，可选用
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// sentry 接入，可选用
// const SentryPlugin = require('@tencent/webpack-sentry-plugin');

const glob = require('glob')
const titles = require('./title.js')
const maps = require('./map.js')

// 统一配置多页
const pages = {}
glob.sync('./src/pages/**/app.js').forEach((filePath) => {
    let chunk = filePath.split('./src/pages/')[1].split('/app.js')[0]
    const chunkFirstName = chunk.split('/')[0]
    // if (chunkFirstName === 'user') {
    //     chunk += '/index'
    // }
    // console.log(chunk)
    pages[chunk] = {
        entry: filePath,
        template: 'public/index.html',
        title: titles[chunk],
        map:maps[chunk]||false,
        chunks: ['chunk-vendors', 'chunk-common', chunk]
    }
})
console.log('process.env.NODE_ENV =' + process.env.NODE_ENV)

module.exports = {
    // baseUrl: './', // 3.3版本已弃用
    pages,
    lintOnSave: false,
    outputDir: './dist',
    publicPath: './', // 相当于baseUrl
    productionSourceMap: !(process.env.NODE_ENV === 'production'),
    css: {
        // loaderOptions: {
        //     postcss: { // px转换rem
        //         plugins: [
        //             require('postcss-pxtorem')({
        //                 rootValue: 40, // 换算的基数,根元素大小px, 要以设计图尺寸大小标准下的网页为准,例如设计图是750px宽度, 则以750px宽度的网页里的html的fontsize为准
        //                 selectorBlackList: ['^van-', '^el-'], // 忽略转换正则匹配项
        //                 propList: ['*'], // *表示通用,所有属性都转为rem
        //             }),
        //         ]
        //     }
        // }
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://14.23.164.13:9005/gdcnymot2',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': ''
                }
            },
            '/jede': {
                target: 'http://14.23.164.13:9005/gdcnymot2',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    // '^/api': ''
                }
            }
        }
    },
    // devServer: {
    //     port: 83,
    //     proxy: {
    //         '/': {
	// 			// target: 'http://192.168.3.9:8090',
	// 			// target: 'http://192.168.1.147:8090',
	// 			// target:'http://14.23.164.13:9005',
	// 			target: 'http://183.6.114.219:23137', //测试
	// 			// target: 'http://183.6.114.219:23901',
    //             // target: 'http://192.168.1.8:8080',
    //     		// target: 'http://10.10.10.160:8080',
    //             ws: false,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 // '^/api': ''
    //             }
    //         },
	// 		// '/jede': {
	// 		// 	target: 'http://183.6.114.219:23137',
	// 		// 	// target: 'http://183.6.114.219:23901',
	// 		//     // target: 'http://192.168.1.8:8080',
	// 		// 	// target: 'http://10.10.10.160:8080',
	// 		//     // ws: true,
	// 		//     changeOrigin: true,
	// 		//     pathRewrite: {
	// 		//         // '^/api': ''
	// 		//     }
	// 		// }
    //     } // 配置开发环境 URL 便于本地开发调试
    // },
    chainWebpack: (config) => {
        config.plugins.delete('named-chunks')
        // config.externals({
        //   'CKEDITOR': 'window.CKEDITOR'
        // })
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    // Provide path to the file with resources
                    resources: './src/style/mixin.scss', // 全局的scss变量

                    // Or array of paths
                    // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
                })
                .end()
        })
        // config.module       // webpackChain 提供的添加 loader 方法
        //     .rule('html')
        //     .use('html-loader')
        //     .loader('html-loader')
    },
    configureWebpack: (config) => {
        const plugins = [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true
                    }
                },
                sourceMap: true
            })
        ]
        // splitChunk 配置
        const splitChunksConfig = {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
                    minChunks: 2
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
        if (process.env.NODE_ENV === 'production') {
            config.plugins = [...config.plugins, ...plugins]
            config.optimization.splitChunks = splitChunksConfig
        }
    }
}
