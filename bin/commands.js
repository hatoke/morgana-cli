const prompts = require("prompts");
const { copyFile } = require("./utilites/filesystem");
const { generateReadme } = require("./template/base/readme");

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

const readMeOptions = async () => {
  const options = await prompts({
    type: "multiselect",
    name: "sections",
    message: "Pick section",
    choices: [
      { title: "Head", value: "HEAD" },
      { title: "Build With", value: "BUILDW" },
      { title: "Prerequisites", value: "PEREQ" },
      { title: "Installation", value: "INSTALL" },
      { title: "Usage", value: "USAGE" },
      { title: "Roadmap", value: "ROADMAP" },
      { title: "Contributing", value: "CONTRIBUTE" },
      { title: "License", value: "LICENSE" },
      { title: "Contact", value: "CONTACT" },
      { title: "Acknowledgments", value: "ACKN" },
    ],
  });
  return options;
};

async function gitignoreFile() {
  copyFile("/template/base/_gitignore", ".gitignore");
}

async function readmeMd() {
  const options = await readMeOptions();
  generateReadme(options);
}

module.exports = {
  async createApp(name, path, argOptions) {
    const options = await appOptions();
    console.log("craete options is ", options);
  },

  async generateAny(options) {
    const files = {
      gitignore: gitignoreFile,
      readme: readmeMd,
    };
    if(files[options]){
      files[options]();
    } else{
      console.log("Not mathcing file")
    }
  },
};
