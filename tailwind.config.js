/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./components/**/*.{html,js}",
        "./assets/js/**/*.js"
    ],
    theme: {
        extend: {},
    },
    plugins: [],

    theme: {
        extend: {
            fontFamily: {
                'general': ['General Sans', 'sans-serif'],
            },
        },
    },
}