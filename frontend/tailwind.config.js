const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base - InkGraphite (Elegant, Deep, Premium)
        background: "#0D0F12",
        surface: "#13161A",
        card: "#1A1D22",
        "text-primary": "#F2F4F7",
        "text-secondary": "#A3A9B6",
        border: "rgba(255,255,255,0.06)",
        
        // Accents - Pastel (Soft, Welcoming)
        primary: "#89B4FA", // Pastel Sky Blue
        secondary: "#A6E3A1", // Pastel Mint
        highlight: "#F5C2E7", // Muted Warm Pink
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(137, 180, 250, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-glow': 'linear-gradient(135deg, rgba(137, 180, 250, 0.03), rgba(166, 227, 161, 0.03))',
      }
    },
  },
  plugins: [],
};
