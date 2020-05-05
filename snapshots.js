const { update, load } = require("json-update");

module.exports = {
  filterJSON: async (filename, filterFunction) => {
    let currentData = {};
    try {
      currentData = await load(filename);
    } catch {}

    return update(filename, filterFunction(currentData));
  }
};
