module.exports = {
    preset: "react-native",
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
    testMatch: ["<rootDir>/Testing/**/*.test.js"],
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
  };
  