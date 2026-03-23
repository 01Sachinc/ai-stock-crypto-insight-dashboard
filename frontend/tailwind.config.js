/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c',
        sidebar: '#121215',
        card: '#18181b',
        border: '#27272a',
        primary: '#3b82f6',
        secondary: '#0ea5e9',
        accent: '#f59e0b',
        muted: '#71717a'
      },
    },
  },
  plugins: [],
}
