/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "day-00": "#FFFFFF", //цвет фона
        "day-50": "#f9f9f9", //цвет фона бок панели
        "day-100": "#f2f2f2", //цвет кнопок
        "day-150": "#ededed", //цвет кнопок при наведении
        "day-200": "#e1e1e1", //цвет кнопок при нажатии
        "day-250": "#c9c9c9",
        "day-300": '#6a6a6a', //цвет текста светлый
        "day-350": "#3f3f3f", //цвет текста темный
        "day-1000": "#302A2A",
        "orange-100": "#e66e0d", //цвет оранжевых кнопок
        "orange-150": "#d7670c", //цвет оранжевых кнопок при наведении
        "orange-200": "#f4760e", //цвет оранжевых кнопок при нажатии
      },
    },
  },
  plugins: [],
}
