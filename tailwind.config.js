/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1d232b",
          secondary: "#1d232b",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          button: "#ededed",
        },
      },
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["synthwave"],
          primary: "#eeebfa",
          secondary: "#090514",
          ".bg-zinc-100": {
            "background-color": "#301e71",
            "border-color": "#eeebfa",
          },
          ".bg-zinc-200": {
            "background-color": "#3b258b",
          },
          ".bg-base-200": {
            "background-color": "#090514",
            "border-color": "#eeebfa",
          },
        },
      },
      // "light",
      // "synthwave",
    ],
  },
  plugins: [require("daisyui")],
};
