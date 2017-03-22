var webpack = require('webpack');
var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

//enviroment variable
var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
var TEST = process.env.NODE_ENV === 'test'

//check if on production
var entry = PRODUCTION
    ?   {
          app:
           [
             './app.jsx',
           ],
          vendor:
          [
            'script-loader!jquery/dist/jquery.min.js',
            'script-loader!foundation-sites/dist/foundation.min.js',
            'react',
            'redux',
            'react-redux',
            'react-router',
            'firebase',
            'react-dom',
            'redux-thunk'
          ]
        }
    :   [

          './app.jsx',
          'script-loader!jquery/dist/jquery.min.js',
          'script-loader!foundation-sites/dist/foundation.min.js',
        ];

var plugins = PRODUCTION
    ?     [
            new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.[hash:12].min.js'}),
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false,
                screw_ie8: true,
                dead_code: true,
                unused: true
              }
            }),
            new HTMLWebpackPlugin({
              template:'index-template.html'
            }),
            new CompressionPlugin({
              asset: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0.8
            }),
            new SWPrecacheWebpackPlugin(
              {
                cacheId: 'hapihour',
                filename: 'hapi-sw.js',
                forceDelete: true,
                minify: true,
                skipWaiting: true,
                verbose: true
              }
            )
          ]
    :     [
            new webpack.NamedModulesPlugin()
          ];


//ADD UNIVERSAL PLUGINS
plugins.push(
  new webpack.DefinePlugin({
   'process.env': {
     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
     API_KEY: JSON.stringify(process.env.API_KEY),
     AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
     DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
     STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
     MESSAGE_SENDER_ID: JSON.stringify(process.env.MESSAGE_SENDER_ID)
   }
 }),
 new webpack.LoaderOptionsPlugin({
      minimize:true,
      debug: false,
      test: /\.scss$/,
      options: {
        sassLoader: {
          includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
          ]
        }
      }
  })
);


//configure hmre
//enable or disable hot module replace
var buildModule = PRODUCTION || TEST
    ?             {
                    rules: [
                      {
                        test: /\.(js|jsx)$/, //check for all js files
                        use: [{
                          loader: 'babel-loader',
                          options: { presets: ['react', 'es2015', 'stage-0']}
                        }],
                        exclude: /(node_modules)/
                      },
                      {
                        test: /\.scss$/,
                        use:['style-loader','css-loader','sass-loader']
                      },
                      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
                    ],
                    noParse: [
                      /node_modules\/sinon/
                    ]
                  }
      :           {
                      rules: [
                        {
                          test: /\.(js|jsx)$/, //check for all js files
                          use: [{
                            loader: 'babel-loader',
                            options: { presets: ['react', 'es2015', 'stage-0', 'react-hmre']}
                          }],
                          exclude: /(node_modules)/
                          },
                          {
                            test: /\.scss$/,
                            use:['style-loader','css-loader','sass-loader']
                          },
                          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
                      ],
                      noParse: [
                        /node_modules\/sinon/
                      ]
                    };


module.exports =  {
  //find this file and start from there
  context: __dirname + '/app',
  entry:entry,
  externals: {
    jquery: 'jQuery'
  },
  plugins: plugins,
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    //where all this needs to happen
    root: __dirname,
    alias: {
      applicationStyles: 'app/styles/app.scss',
      Main: 'app/components/Main.jsx'
    },
    //files we want to process
    extensions: ['', '.js', '.jsx']
  },
  module: buildModule,
  devServer: {
    contentBase: './public',
    inline: true,
    hot: true
  },
  devtool: 'cheap-module-eval-source-map'
};
