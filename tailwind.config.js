/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        dt: { max: "1300px" },
        lt: { max: "1024px" },
        nlt: { max: "950px" },
        slt: { max: "768px" },
        tb: { max: "660px" },
        mbl: { max: "480px" },
        nmbl: { max: "460px" },
        smbl: { max: "410px" },
      },
      colors: {
        gray: "#F3F3F3",
        green: "#089449",
        "gray-opacity": "var(--color-gray-3, #898989)",
      },
      margin: {
        0: "0px",
        5: "5px",
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        45: "45px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        auto: "auto",
      },
      padding: {
        0: "0px",
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        80: "80px",
        100: "100px",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        36: "36px",
      },
      lineHeight: {
        30: "30px",
      },
      fontFamily: {
        fira: ["Fira Sans"],
      },
      borderRadius: {
        circle: "50%",
      },
    },
  },
  plugins: [],
};
