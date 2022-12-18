const prompts = require("prompts");
const { copyFile } = require("./utilites/filesystem");

const appOptions = async () => {
  const appType = await prompts({
    type: "select",
    name: "appType",
    message: "Which app?",
    choices: [
      { title: "Rollup Vue Plugin", value: "rollupVuePlugin" },
      { title: "Express REST API", value: "express" },
      { title: "Fastify REST API", value: "fastify" },
    ],
  });

  function isValidQuestion(appName, type) {
    if (typeof appName === "string") {
      return appType.appType === appName ? type : null;
    }
    if (typeof appName === "object") {
      let resultType = null;
      appName.forEach((app) => {
        if (appType.appType === app) {
          resultType = type;
        }
      });
      return resultType;
    }
  }

  const appDetailsQuestion = [
    {
      type: "toggle",
      name: "typescript",
      message: "Add Typescript?",
      active: "Yes",
      inactive: "No",
      initial: true,
    },
    {
      type: () => isValidQuestion("rollupVuePlugin", "toggle"),
      name: "style",
      message: "Add Sass/Scss?",
      active: "Yes",
      inactive: "No",
      initial: false,
    },
  ];

  const appDetails = await prompts(appDetailsQuestion);
  return { ...appType, appDetails };
};

module.exports = {
  async createApp(name, path, argOptions) {
    const options = await appOptions();
    console.log("craete options is ", options);
  },

  async gitignoreFile() {
    copyFile("/template/base/_gitignore", ".gitignore");
  },
};
