module.exports = {
  resilientContains: (cy, text, snapshotVerifier) => {
    const element = cy.contains(text);
    snapshotVerifier(element, text);

    return element;
  }
};
