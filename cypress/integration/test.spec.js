const { resilientContains } = require("../../index.js");
const { snapshotVerifier } = require("../../snapshots.js");

it("", () => {
  cy.visit("./helloWorld.html");
  resilientContains(cy, "Hello World!", snapshotVerifier, Cypress).should(
    "be.visible"
  );
});
