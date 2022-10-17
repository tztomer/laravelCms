/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,cjs,vue,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
