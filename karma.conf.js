var webpackConfig = require('./webpack.test.conf.js');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      './src/**/*-test.js'
    ],
    frameworks: [ 'mocha' ],
    preprocessors: {
      './src/**/*-test.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    'plugins' : [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-webpack',
    ]
  });
};
