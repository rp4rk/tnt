const { override, fixBabelImports } = require("customize-cra");

// For antd
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
