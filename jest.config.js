module.exports = {
    preset: "react-native",
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
    testMatch: ["<rootDir>/__tests__/**/*.test.js"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
  };
  