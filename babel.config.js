module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          root: 'src',
        },
      ],
      'babel-plugin-react-compiler', // this must be after the unistyles plugin
      'react-native-worklets/plugin', // This must be the last plugin
    ],
  };
};
