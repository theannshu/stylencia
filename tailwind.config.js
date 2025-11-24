/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#8A2BE2', // BlueViolet
                secondary: '#D3B8E0', // Light Purple
                dark: '#2d033b', // Deep Purple
            }
        },
    },
    plugins: [],
}
