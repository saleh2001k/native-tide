const { withReactScanTreeShake } = require('react-scan/babel');

module.exports = withReactScanTreeShake({
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'],
});
