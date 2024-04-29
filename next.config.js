const path = require('path');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@config'] = path.join(__dirname, 'config');
    config.resolve.alias['@layouts'] = path.join(__dirname, 'layouts'); // Add this line
    config.resolve.alias['@lib'] = path.join(__dirname, 'lib');
    config.resolve.alias['@partials'] = path.join(__dirname, 'layouts', 'partials');
    config.resolve.alias['@components'] = path.join(__dirname, 'layouts', 'components');
    config.resolve.alias['@shortcodes'] = path.join(__dirname, 'layouts', 'shortcodes');
    config.resolve.alias['@json'] = path.join(__dirname, 'json');
    config.resolve.alias['@hooks'] = path.join(__dirname, 'hooks')
    return config;
  },
};

module.exports = nextConfig;
