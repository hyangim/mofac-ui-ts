const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware('/mofac', {
//       target: 'http://localhost:8080',
//       pathRewrite: {
//         '^/mofac':''
//       },
//       changeOrigin: true,
//     }),
//   );
// };


module.exports = function (app) {
  app.use(
    createProxyMiddleware('/mofacApi', {
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/mofacApi':''
      },
      changeOrigin: true,
    }),
  );
};


