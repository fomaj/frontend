const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['react-tradingview-embed', 'react-icons',
  '@polyjuice-provider/godwoken', '@polyjuice-provider/base', '@polyjuice-provider/web3', 'nervos-godwoken-integration']);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  webpack5: false,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // This was due to type errors in @polyjuice-provider/godwoken
    // Remove when it fixed
    ignoreBuildErrors: true,
  },
});
// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }
