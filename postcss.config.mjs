import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssAntdFixes from 'postcss-antd-fixes';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';

const isProd = process.env.NODE_ENV === 'production';

const plugins = [
  postcssImport(),
  tailwindcss(),
  postcssAntdFixes({ prefixes: ['ant', 'el', 'n', 'td'] }),
  postcssPresetEnv(),
  autoprefixer(),
];

if (isProd) {
  plugins.push(cssnano());
}

export default {
  plugins,
};
