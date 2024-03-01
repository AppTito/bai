import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'alegreya-sans': ['Alegreya Sans', 'sans-serif'],
                'fira-sans': ['Fira Sans', 'sans-serif'],
                'open-sans': ['Open Sans', 'sans-serif'],
            },
            colors: {
                borderHover: {
                    100: "#deffbc",
                    900: "#19d488",
                },
                itemSA:"#00553f",
                primary: "#ffc42a",
                fondoVerde: "#00553f",
            },
        },
    },

    plugins: [forms],
};
