import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
    darkMode: 'class',

  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
  themes: ["light", "dark", "corporate"],
  darkTheme: "dark",
  base: true,
  styled: true,
  utils: true,
  logs: false,
  rtl: false,
  prefix: "",
  className: "class", // <<< this tells DaisyUI to rely on `dark` class
},
};

export default config;
