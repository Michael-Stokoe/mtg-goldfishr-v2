/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,vue}",
    "./*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(green|red|blue|black|white|neutral)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['hover', 'focus']
    },
    {
      pattern: /outline-(green|red|blue|black|white|neutral)-(100|200|300|400|500|600|700|800|900)/
    },
  ],
}

