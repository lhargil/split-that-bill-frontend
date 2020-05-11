const webpack = require('webpack');
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html', './src/**/*.component.ts'],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
});

module.exports = (config, options) => {
  console.log(`Using '${config.mode}' mode`);
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.SPLIT_THAT_BILL_ENVIRONMENT': JSON.stringify(process.env.SPLIT_THAT_BILL_ENVIRONMENT),
    'process.env.SPLIT_THAT_BILL_BASEURL': JSON.stringify(process.env.SPLIT_THAT_BILL_BASEURL),
    'process.env.SPLIT_THAT_BILL_SITEURL': JSON.stringify(process.env.SPLIT_THAT_BILL_SITEURL)
  }));
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: [
            require('postcss-import'),
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
            ...(config.mode === 'production' ? [purgecss] : [])
          ]
        }
      }
    ]
  });
  return config;
};
