const { update, load } = require("json-update");
const { filterJSON } = require("./snapshots.js");

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
