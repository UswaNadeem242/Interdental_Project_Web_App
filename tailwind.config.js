/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#013764",
        secondaryBrand: "#001D58",
        tertiaryBrand: "#393A44",
        fouthBrand: '#94D3DD',
        primaryText: "#434343",
        secondaryText: "#949494",
        textField: "#F8F8F8",
        background: "#F8F8F8",
        card: "#F8F8F8",
        bgWhite: "#FFFFFF",
        bgBlack: "#000000",
        docText: '#737791',
        textFieldColor: '#F8F8F8',
        borderPrimary: '#E5E5E5',
        textFieldHeading: '#828386',
        textColor: '#757575',
        cartColor: '0000000D'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      // fontWeight: {
      //   thin: 100,
      //   extralight: 200,
      //   light: 300,
      //   normal: 400,
      //   medium: 500,
      //   semibold: 600,
      //   bold: 700,
      //   extrabold: 800,
      //   black: 900,
      // },
      fontSize: {
        primary: "14px",
        secondary: "28px",
      },
    },
  },
  plugins: [],
};
