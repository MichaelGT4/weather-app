/** @type {import('tailwindcss').Config} */
export default {
  content: [  
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      
      // that is animation class
      animation: {
        fadeIn: 'fadeIn 0.5s forwards',
      },

      transitionProperty: {
        'height': 'height',
        'max-height': 'max-height'
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { scale: 0, opacity: 0},
          '100%': { scale: 1, opacity: 1},
        },
      }),
    },
  },
  plugins: [],
}

