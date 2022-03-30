// const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api1", {
            //遇见/api1前缀的请求，就会触发该代理配置
            target: "https://www.wanandroid.com", //请求转发给谁
            changeOrigin: true, //控制服务器收到的请求头中Host的值
            pathRewrite: { "^/api1": "" }, //重写请求路径(必须)
        }),
        createProxyMiddleware("/api2", {
            //遇见/api1前缀的请求，就会触发该代理配置
            target: "https://api.codelife.cc", //请求转发给谁
            changeOrigin: true, //控制服务器收到的请求头中Host的值
            pathRewrite: { "^/api2": "" }, //重写请求路径(必须)
        }),
        createProxyMiddleware("/api3", {
            //遇见/api1前缀的请求，就会触发该代理配置
            target: "https://go.itab.link", //请求转发给谁
            changeOrigin: true, //控制服务器收到的请求头中Host的值
            pathRewrite: { "^/api3": "" }, //重写请求路径(必须)
        })
    );
};
