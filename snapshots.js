const path = require("path");

const snapshotVerifier = async (cy, text, Cypress) => {
  const specFile = Cypress.spec.absolute;
  const specFilePath = path.dirname(specFile);
  const snapshotFileName = `${path.basename(specFile)}.json`;
  const snapshotDirPath = path.join(specFilePath, "__strings__");
  const snapshotFilePath = path.join(snapshotDirPath, snapshotFileName);

  const currentSnapshot = await cy.task("readJSON", {
    filename: snapshotFilePath
  });

  if (currentSnapshot) {
    return cy.get(`[data-test="${currentSnapshot[text].id}"]`);
  } else {
    return cy.contains(text).then($el => {
      const newData = {
        [text]: {
          id: $el.attr("data-test"),
          text
        }
      };
      cy.task("writeJSON", {
        filename: snapshotFilePath,
        snapshotDirPath,
        newData
      });

      return element;
    });
  }
};

module.exports = {
  snapshotVerifier
};
