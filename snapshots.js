const path = require("path");

const snapshotVerifier = async (cy, element, text, Cypress) => {
  const specFile = Cypress.spec.absolute;
  const specFilePath = path.dirname(specFile);
  const snapshotFileName = `${path.basename(specFile)}.json`;
  const snapshotDirPath = path.join(specFilePath, "__strings__");
  const snapshotFilePath = path.join(snapshotDirPath, snapshotFileName);
  const newData = {
    [text]: {
      id: "fake id",
      text
    }
  };

  cy.task("writeJSON", {
    filename: snapshotFilePath,
    snapshotDirPath,
    newData,
    element
  });

  return cy.contains(text);

  //return element;
};

module.exports = {
  snapshotVerifier
};
