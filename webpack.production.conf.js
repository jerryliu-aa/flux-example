var webpack = require("webpack");
var lodash = require("lodash");
var path = require('path');
var baseConfs = require('./webpack.base.conf.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var I18nPlugin = require("i18n-webpack-plugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssCalc = require('postcss-calc');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var languages = {
  'en_US': {},
  'zh_TW': {},
  'zh_CN': {}
};

var altParentLangNames = {
  'zh_CN': 'zh',
  'zh_TW': 'zh',
  'en_US': 'en',
};

var altLangNames = {
  'zh_CN': 'zh-Hans-CN',
  'zh_TW': 'zh-Hant-TW',
  'en_US': 'en-US',
};

baseConfs = lodash.map(baseConfs, function(conf) {

  var lang = conf.lang;

  var altLangName = altLangNames[lang];
  var altParentLangName = altParentLangNames[lang];

  var node_modules = path.resolve(__dirname, 'node_modules');

  conf.plugins = [
    new webpack.DefinePlugin({
      BUILD_I18N: '"' + lang + '"',
      BUILD_I18N_PATH: '"./' + lang + '.js"',
      BUILD_INTL_PATH: '"react-intl/locale-data/' + altParentLangName + '.js"',
      BUILD_INTL_NAME: '"' + altLangName + '"',
      BUILD_INTL_PARENT_NAME: '"' + altParentLangName + '"',
    }),
    new I18nPlugin(
      languages[lang],
      '__i18nPluginFn'
    ),
    new ExtractTextPlugin('[name].css', {allChunks:true}),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor-' + lang, /* filename= */'vendor-'+ lang + '-[chunkhash].js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index-' + lang + '.html',
      filename: 'index-' + lang + '.html',
      chunks: ['app-' + lang, 'vendor-' + lang, ],
    }),
  ];

  conf.output = {
    path: 'dist/production',
    filename: '[name]-[chunkhash].js',
    chunkFilename: 'chunk-[chunkhash].js'
  };
  conf.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: /liuyanghejerry/
    })
  );

  return conf;
});

module.exports = baseConfs;
