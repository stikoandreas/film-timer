import {
  combinePresetAndAppleSplashScreens,
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config';

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: combinePresetAndAppleSplashScreens(
    {
      ...minimal2023Preset,
      apple: {
        ...minimal2023Preset.apple,
        resizeOptions: { background: '#ffe066' },
      },
      maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: '#ffe066' } },
    },
    {
      padding: 0.5,
      resizeOptions: { background: '#ffe066', fit: 'contain' },
      linkMediaOptions: {
        log: true,
        addMediaScreen: true,
        basePath: '/',
        xhtml: false,
      },
      png: {
        compressionLevel: 9,
        quality: 60,
      },
    }
  ),
  images: ['public/logo.svg'],
});
