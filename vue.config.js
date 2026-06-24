module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? "/cashflow-balance-sheet/"
    : "/",
  configureWebpack: {
    devtool: "source-map"
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/palette.scss";`
      }
    }
  }
};
