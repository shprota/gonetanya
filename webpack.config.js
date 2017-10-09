var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    loaders: [
      {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.(scss|sass)$/, loader: 'style!css!sass'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.png$/, loader: 'raw'},
      {test: /\.jpg/, loader: 'raw'},
      {test: /\.woff/, loader: 'raw'},
      {test: /\.svg/, loader: 'raw'},
      {test: /\.ttf/, loader: 'raw'},
      {test: /\.eot/, loader: 'raw'},
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      niceScroll: "niceScroll",
      ngNiceScroll: "ngNiceScroll"
    })
  ],
  resolve: {
    alias: {
      jquery: "jquery/src/jquery",
      niceScroll: 'jquery.nicescroll/jquery.nicescroll',
      ngNiceScroll: 'angular-nicescroll/angular-nicescroll',
      ngMap: 'ngmap/build/scripts/ng-map'
    }
  },

};
