module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo", // Este es el preset básico de Expo
      "nativewind/babel", // Preset de NativeWind para usar Tailwind en React Native
    ],
  };
};
