const path = require("path");
const { update, load } = require("json-update");

const filterJSON = async (filename, filterFunction) => {
  let currentData = {};
  try {
    currentData = await load(filename);
  } catch {}

  return update(filename, filterFunction(currentData));
};

const snapshotVerifier = (cy, element, text, Cypress) => {
  const specFile = Cypress.spec.absolute;
  const specFilePath = path.dirname(specFile);
  const snapshotFileName = `${path.basename(specFile)}.json`;
  const snapshotFilePath = path.join(
    specFilePath,
    "__strings__",
    snapshotFileName
  );

  return filterJSON(snapshotFilePath, currentValue => ({
    ...currentValue,
    [text]: {
      id: element.attr("data-test"),
      text
    }
  }));
};

module.exports = {
  filterJSON,
  snapshotVerifier
};
