//File: tailwind.config.js

// const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  variants: {
    extend: {
      touchAction: ["responsive"],
    },
  },
  theme: {
    extend: {
      // value of 100 represents base value, and <100 represets tints and >100
      // represents tints
      transitionProperty: {
        width: "width",
      },
      colors: {
        "dark-layer-1": "rgb(40,40,40)",
        "dark-layer-2": "rgb(26,26,26)",
        "dark-label-2": "rgba(239, 241, 246, 0.75)",
        "dark-divider-border-2": "rgb(61, 61, 61)",
        "dark-fill-2": "hsla(0,0%,100%,.14)",
        "dark-fill-3": "hsla(0,0%,100%,.1)",
        "dark-gray-6": "rgb(138, 138, 138)",
        "dark-gray-7": "rgb(179, 179, 179)",
        "gray-8": "rgb(38, 38, 38)",
        "dark-gray-8": "rgb(219, 219, 219)",
        "brand-orange": "rgb(255 161 22)",
        "brand-orange-s": "rgb(193, 122, 15)",
        "dark-yellow": "rgb(255 192 30)",
        "dark-pink": "rgb(255 55 95)",
        "dark-green-s": "rgb(44 187 93)",
        "dark-blue-s": "rgb(10 132 255)",
        neutral: {
          100: "#000000",
          90: "#1A1A1A",
          80: "#333333",
          70: "#4D4D4D",
          60: "#666666",
          50: "#808080`",
          40: "#999999",
          30: "#B3B3B3",
          20: "#CCCCCC",
          10: "#E6E6E6",
          0: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#FFD700",
          dark: "#CCAC00",
          light: "#FFDF33",

          0: "#FFFFFF",
          20: "#FFF7CC",
          40: "#FFEF99",
          60: "#FFE766",
          80: "#FFDF33",
          100: "#FFD700",
          120: "#CCAC00",
          140: "#998100",
          160: "#665600",
          180: "#332B00",
          200: "#000000",
        },
        secondary: {
          DEFAULT: "#00FFD7",
        },
        tertiary: {
          DEFAULT: "#D700FF",
        },
        link: {
          DEFAULT: "#00FFD7",
        },
      },
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },

        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        dim: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        darken: {
          "0%, 100%": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
          "50%": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        expand: {
          "0%": {
            opacity: "0",
            width: "0",
            transformOrigin: "right",
          },
          "100%": {
            opacity: "1",
            width: "100%",
            transformOrigin: " right",
          },
        },
        collapse: {
          "0%": {
            opacity: "1",
            width: "100%",
          },
          "100%": {
            opacity: "0",
            width: "0",
          },
        },
      },
      animation: {
        dim: "dim 2s ease-out infinite",
        darken: "darken 2s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        expand: "expand 0.2s ease-in-out ",
        collapse: "collapse 0.2s ease-in-out ",
        rotate: "rotate 6s linear infinite",
        shine: "shine 1.8s ease-out infinite",
      },
      forms: {
        radio: {
          color: "green",
          ":checked": {
            color: "green",
            borderColor: "red",
            borderWidth: "3px",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
    // nextui({
    //   defaultTheme: "dark",
    //   themes: {
    //     dark: {
    //       colors: {
    //         primary: {
    //           DEFAULT: "#FFD700",
    //           foreground: "#000000",
    //         },
    //       },
    //     },
    //   },
    // }),
  ],
};
