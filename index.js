module.exports = {
  resilientContains: async (cy, text, snapshotVerifier, Cypress) => {
    const element = cy.contains(text);
    await snapshotVerifier(cy, element, text, Cypress);

    return element;
  }
};
