/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans'],
            },
        },
        daisyui: {
            themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
            // themes: [
            //     {
            //         mytheme: {
            //             primary: '#67e8f9',

            //             secondary: '#f0abfc',

            //             accent: '#fde047',

            //             neutral: '#191D24',

            //             'base-100': '#f5f5f4',

            //             info: '#0891b2',

            //             success: '#36D399',

            //             warning: '#FBBD23',

            //             error: '#F87272',
            //         },
            //     },
            // ],
        },
    },
    plugins: [require('daisyui')],
};
