module.exports = {
  resilientContains: (cy, text, snapshotVerifier) => {
    const element = cy.contains(text);
    snapshotVerifier(cy, element, text);

    return element;
  }
};
