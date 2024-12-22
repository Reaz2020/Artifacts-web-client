// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this is set to your project's file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],  // Add this line
}
