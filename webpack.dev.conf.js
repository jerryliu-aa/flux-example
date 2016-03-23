var webpack = require("webpack");
var lodash = require("lodash");
var baseConfs = require('./webpack.base.conf.js');

baseConfs = lodash.map(baseConfs, function(conf) {
  conf.output.path = 'dist/dev';

  conf.cache = true;
  conf.devtool = 'eval';
  conf.devServer = {
    contentBase: './dist/dev',
    port: 8080,
    hot: true,
    inline: true
  };
  lodash.map(conf.entry, function(entry, name) {
    if (name.indexOf('app-') >= 0) {
      entry.unshift('webpack/hot/dev-server');
    }
    return entry;
  });

  return conf;
});

module.exports = baseConfs;
