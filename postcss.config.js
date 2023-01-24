import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';

// https://github.com/tailwindlabs/tailwindcss/discussions/5858#discussioncomment-4587882
export default {
    plugins: [autoprefixer, tailwind(tailwindConfig)],
};
