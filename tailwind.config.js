module.exports = {
    darkMode: "class", // very important
    content: [
        "./src/*/.{js,ts,jsx,tsx}",
        // Add shadcn ui paths if needed
    ],
    theme: {
        extend: {
            transitionProperty: {
                theme: 'background-color, color, border-color',
            },
        },
    },
    plugins: [],
}