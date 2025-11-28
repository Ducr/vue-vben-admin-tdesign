import config from '@vben/tailwind-config';
import cssnano from 'cssnano';

export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano } : {}),
    autoprefixer: {},
    'postcss-antd-fixes': { prefixes: ['ant', 'el'] },
    'postcss-import': {},
    'postcss-preset-env': {},
    tailwindcss: { config },
    'tailwindcss/nesting': {},
  },
};
