export default {
  '*.{js,ts}': 'eslint --fix',
  '*.{js,ts,css,scss,md}': 'prettier --ignore-unknown --write',
  '*.js': 'eslint --cache --fix',
};
