module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'postcss-sorting': {
      order: [
        'custom-properties',
        'dollar-variables',
        'declarations',
        'at-rules',
        'rules',
      ],

      'properties-order': [
        'display',
        'content',
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'width',
        'height',
        'margin',
        'padding',
        'z-index',
      ],

      'unspecified-properties-position': 'bottom',
    },
  },
};
