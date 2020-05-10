const { snapshotVerifier } = require("../../snapshots.js");

it("", () => {
  cy.visit("./helloWorld.html");
  cy.resilientContains("Hello World!").should("be.visible");
});
