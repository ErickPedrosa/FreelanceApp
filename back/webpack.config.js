const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "timers": require.resolve("timers-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "http": require.resolve("stream-http"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "fs": false  // fs não tem polyfill no navegador
    }
  }
};