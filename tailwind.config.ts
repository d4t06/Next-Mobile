import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  corePlugins: {
    backgroundOpacity: false,
    textOpacity: false,
    borderOpacity: false,
  },
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "10px",
    },
  },
  plugins: [],
};
export default config;
