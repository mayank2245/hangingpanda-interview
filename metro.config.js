const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

// Load the default configuration
const defaultConfig = getDefaultConfig(__dirname);

// Filter out SVG from assetExts and add it to sourceExts
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    // Exclude node_modules if it’s causing too many files to be watched
    blacklistRE: blacklist([/node_modules\/.*/]),
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
};

// Merge default config with custom config
module.exports = mergeConfig(defaultConfig, config);
