export default {
  '**/*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
  '**/*.json': ['prettier --write'],
  '**/*.md': ['prettier --write'],
};
