import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      container: {
         center: true,
         padding: '10px'
      },
   },
   plugins: [],
   purge: ['./src/**/*.{js,ts,jsx,tsx}']
};
export default config;
