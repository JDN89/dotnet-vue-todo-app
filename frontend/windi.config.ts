import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";

export default defineConfig({
  darkMode: "class",
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: {
    prefix: "w:",
  },

  plugins: [typography()],
  variants: {
    // extend: {
    //   // ...
    //   // scale: ['active', 'group-hover','focus'],
    // },
  },
  theme: {
    extend: {
      colors: {
        dark: {
          900: " #121212",
        },
        "wino-red": "#9d0006",
        "mellow-yellow": "#fabd2f",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "165ch",
            color: "inherit",
            a: {
              color: "yellow-300",
              opacity: 0.75,
              fontWeight: "500",
              textDecoration: "",
              "&:hover": {
                opacity: 1,
                
              },
            },
            b: { color: "inherit" },
            strong: { color: "inherit" },
            em: { color: "inherit" },
            h1: { color: "inherit" },
            h2: { color: "inherit" },
            h3: { color: "inherit" },

            h4: { color: "inherit" },
            code: { color: "inherit" },
          },
        },
      },
    },
  },
});
