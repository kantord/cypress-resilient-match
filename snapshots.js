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
    const dataTestId = currentSnapshot[text].id;
    const element = cy.get(`[data-test="${dataTestId}"]`);

    element.then($el => {
      const currentText = $el.text();
      if (text !== currentText) {
        console.warn(
          `String outdated! "[data-test='${dataTestId}']" was referenced using the old string "${text}" but its current string is "${currentText}"`
        );
      }
    });

    return element;
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
