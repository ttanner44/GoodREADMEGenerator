const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "What is your GitHub Username?"
    },
    {
      type: "input",
      name: "repo",
      message: "What is the project title?"
    },
    {
      type: "input",
      name: "install",
      message: "What are the Installation Instructions?"
    },
    {
      type: "input",
      name: "licenseType?",
      message: "What type of license?"
    },
    {
      type: "input",
      name: "contributors",
      message: "Who are the contributors?"
    },

  ]);
}

function githubRepoData (answers.github, repo) {

    const queryUrl = `https://api.github.com/users/${username}/${repo}`;
    
    axios.get(queryUrl).then(function(res) {
        const repoNames = res.data.map(function(response1) {
          return (response1.name, response1.avatar_url, response1.email)
        });
    }
}

function generateMD(answers) {
//   return `write fiel`;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const githubAPI = githubRepoData(answers);

    const readmemd = generateMD(answers);

    await writeFileAsync("readme.md", XXX);

    console.log("Successfully wrote to readme.md");
  } catch(err) {
    console.log(err);
  }
}

init();
