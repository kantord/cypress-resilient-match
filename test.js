const { resilientContains } = require("./index.js");

describe("resilientContains", () => {
  let cy, text, matchingElement, resultingValue, snapshotVerifier;

  beforeEach(async () => {
    text = jest.fn();
    matchingElement = jest.fn();
    snapshotVerifier = jest.fn();
    cy = {
      contains: jest.fn().mockReturnValue(matchingElement)
    };

    resultingValue = await resilientContains(cy, text, snapshotVerifier);
  });

  it("selects element by text", () => {
    expect(cy.contains).toHaveBeenCalledWith(text);
  });

  it("returns matching element", () => {
    expect(resultingValue).toBe(matchingElement);
  });

  it("verifies snapshot", () => {
    expect(snapshotVerifier).toHaveBeenCalledWith(cy, matchingElement, text);
  });
});
