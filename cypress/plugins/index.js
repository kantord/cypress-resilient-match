/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const fs = require("fs");
  const jsonfile = require("jsonfile");

  on("task", {
    writeJSON({ filename, newData, snapshotDirPath, element }) {
      let currentData;
      try {
        currentData = jsonfile.readFileSync(filename);
      } catch {}
      jsonfile.writeFileSync(filename, {
        ...currentData,
        ...newData
      });

      return element;
    }
  });
};
