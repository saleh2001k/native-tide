const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const mergedConfig = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'svg'],
  },
};

module.exports = withNativeWind(mergedConfig, { input: './global.css' });
