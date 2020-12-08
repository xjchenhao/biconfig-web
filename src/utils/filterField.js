module.exports = {
  mapFindValueType(object, type) {
    for (const key in object) {
      const value = object[key];

      if ((typeof value) === type) {
        return key;
      }
    }
  },
};

