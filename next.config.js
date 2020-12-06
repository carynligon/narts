const path = require('path');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { titleProp: true },
        },
      ],
      exclude: [path.resolve(__dirname, 'public/images')],
    });

    config.module.rules.push({
      test: /\.(svg|png|gif|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/images',
            publicPath: `_next/static/images/`,
          },
        },
      ],
      include: [path.resolve(__dirname, 'public/images')],
    });

    return config;
  },
};
