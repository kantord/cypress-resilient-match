const { update, load } = require("json-update");
const { filterJSON, snapshotVerifier } = require("./snapshots.js");

afterEach(() => {
  jest.resetAllMocks();
});

describe("filterJSON", () => {
  let correctFilename,
    filterFunction,
    JSONContenents,
    filterFunctionReturnValue;

  beforeEach(async () => {
    correctFilename = jest.fn();
    filterFunction = jest.fn();
    JSONContenents = jest.fn();
    filterFunctionReturnValue = jest.fn();
    load.mockReturnValueOnce(JSONContenents);
    filterFunction.mockReturnValueOnce(filterFunctionReturnValue);
    await filterJSON(correctFilename, filterFunction);
  });

  it("calls load with correct parameter", () => {
    expect(load).toBeCalledWith(correctFilename);
  });

  it("calls filter function with correct parameter", () => {
    expect(filterFunction).toBeCalledWith(JSONContenents);
  });

  it("writes correct data into file", () => {
    expect(update).toBeCalledWith(correctFilename, filterFunctionReturnValue);
  });

  describe("new snapshot file", () => {
    beforeEach(async () => {
      correctFilename = jest.fn();
      filterFunction = jest.fn();
      JSONContenents = jest.fn();
      filterFunctionReturnValue = jest.fn();
      load.mockImplementation(() => {
        throw new Error();
      });
      filterFunction.mockReturnValueOnce(filterFunctionReturnValue);
      await filterJSON(correctFilename, filterFunction);
    });

    it("calls filterFunction with correct value", () => {
      expect(filterFunction).toBeCalledWith({});
    });
  });
});

describe("snapshotVerifier", () => {
  const createFakeCypress = ({ specFileName }) => ({
    spec: {
      name: specFileName,
      relative: `cypress/integration/${specFileName}`,
      absolute: `/foo/bar/cypress/integration/${specFileName}`
    }
  });
  let cy, text, element, id, specFileName, Cypress;

  const setSnapshotFileValue = value => load.mockReturnValue(value);

  beforeEach(() => {
    cy = jest.fn();
    text = jest.fn();
    id = jest.fn();
    Cypress = createFakeCypress({ specFileName: "my.spec.js" });
    element = {
      attr: jest.fn().mockReturnValue(id)
    };
  });

  [
    {
      specFileName: "fooBar.spec.js",
      expectedSnapshotPath:
        "/foo/bar/cypress/integration/__strings__/fooBar.spec.js.json"
    },
    {
      specFileName: "helloWorld.spec.js",
      expectedSnapshotPath:
        "/foo/bar/cypress/integration/__strings__/helloWorld.spec.js.json"
    }
  ].forEach(({ specFileName, expectedSnapshotPath }) => {
    it(`writes snapshot into correct file - ${specFileName}`, async () => {
      setSnapshotFileValue({});
      Cypress = createFakeCypress({ specFileName });
      await snapshotVerifier(cy, element, text, Cypress);
      expect(update).toHaveBeenCalledWith(
        expectedSnapshotPath,
        expect.anything()
      );
    });
  });

  it("sets correct snapshot value when snapshot doesn't exist yet", async () => {
    setSnapshotFileValue({});
    await snapshotVerifier(cy, element, text, Cypress);
    expect(update).toHaveBeenCalledWith(expect.anything(), {
      [text]: {
        id,
        text
      }
    });
  });

  it("sets correct snapshot value when snapshot file is not empty", async () => {
    setSnapshotFileValue({
      foo: "bar"
    });
    await snapshotVerifier(cy, element, text, Cypress);
    expect(update).toHaveBeenCalledWith(expect.anything(), {
      foo: "bar",
      [text]: {
        id,
        text
      }
    });
  });
});
