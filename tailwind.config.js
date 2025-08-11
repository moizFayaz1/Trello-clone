// tailwind.config.js (ESM format ke liye)


export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 👈 apne files ka path check kar lena
  ],
  theme: {
    extend: {
      colors: {
        ring: '#008000',
      },
    },
  },
};
