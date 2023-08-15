/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1d4ed8',

          secondary: '#1e3a8a',

          accent: '#dbeafe',

          neutral: '#d1d5db',

          'base-100': '#1e3a8a',

          info: '#6d28d9',

          success: '#065f46',

          warning: '#a16207',

          error: '#881337',
        },
      },
      'forest',
      'valentine',
    ],
  },
};
