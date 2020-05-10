module.exports = {
  resilientContains: async (cy, text, snapshotVerifier, Cypress) => {
    return await snapshotVerifier(cy, text, Cypress);
  }
};
