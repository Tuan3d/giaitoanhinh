const keyMapping = {
  "key123": "AIzaSyA5X9aZJ9A-uHLZeiHukKHkdU5BxdOs0AE",
  "CUSTOM_KEY_002": "AIzaSyA5X9aZJ9A-uHLZeiHukKHkdU5BxdOs0AE"
};

function validateCustomKey(customKey) {
  return keyMapping[customKey] || null;
}
