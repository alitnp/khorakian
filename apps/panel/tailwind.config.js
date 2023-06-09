/* eslint-disable no-undef */
module.exports = {
  important: true,
  darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      fontSize: {
        '2xs': '10px',
      },
      colors: {
        't-primary-color': 'var(--primary-color)',
        't-secondary-color': 'var(--secondary-color)',
        't-success-color': 'var(--success-color)',
        't-warning-color': 'var(--warning-color)',
        't-error-color': 'var(--error-color)',
        't-bg-color': 'var(--bg-color)',
        't-border-color-base': 'var(--border-color-base)',
        't-faded-primary-color': 'var(--faded-primary-color)',
        't-hovered-primary-color': 'var(--primary-color-hovered)',
        't-text-color': 'var(--text-color)',
        't-secondary-text-color': 'var(--text-color-secondary)',
        't-body-bg': 'var(--body-bg)',
        't-layer-bg-color': 'var(--layer-bg-color)',
        't-layer-bg-color-hovered': 'var(--layer-bg-color-hovered)',
        't-opposite-text-color': 'var(--opposite-text-color)',
        't-input-bg-color': 'var(--input-bg-color)',
      },
    },
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [],
};
