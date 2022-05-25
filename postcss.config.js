module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        importFrom: "./styles/tokens.css",
        autoprefixer: {
          flexbox: "no-2009",
          supports: false,
        },
        stage: 1,
      },
    ],
  ],
};
