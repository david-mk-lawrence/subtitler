const colors = require('tailwindcss/colors')

const graphite = {
    50: "#80899D",
    100: "#767D8C",
    200: "#717680",
    300: "#626772",
    400: "#565B66",
    500: "#484c54",
    600: "#393c42",
    700: "#2c2e33",
    800: "#202124",
    900: "#1a1b1c",
}

module.exports = {
    content: [
        "./src/renderer/**/*.{jsx,tsx,html}",
    ],
    theme: {
        extend: {
            colors: {
                pd: colors.rose, // primary-dark
                pl: colors.sky, // primary-light
                bd: graphite, // base-dark
                bl: colors.slate, // base-light
                cd: colors.neutral, // contrast-dark
                cl: colors.gray, // contrast-light
                td: colors.slate, // text-dark
                tl: colors.slate, // text-light
                graphite: graphite,
            },
            width: {
                "1ch": "1ch",
                "2ch": "2ch",
                "3ch": "3ch",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
}
