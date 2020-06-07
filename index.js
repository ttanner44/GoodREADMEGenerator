const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
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
      name: "appUrl",
      message: "What is the URL to run your application?"
    },
    {
      type: "input",
      name: "projectUrl",
      message: "What is the URL to your project?"
    },
    {
      type: "input",
      name: "repo",
      message: "What is the project name?"
    },
    {
      type: "input",
      name: "description",
      message: "Please write a short description of your project"
    },
    {
      type: "input",
      name: "userStory",
      message: "What is the user story?"
    },
    {
      type: "input",
      name: "accptCriteria",
      message: "What are the acceptance criteria?"
    },
    {
      type: "input",
      name: "license",
      message: "What type of license?"
    },
    {
      type: "input",
      name: "install",
      message: "What command should be run to install dependencies?"
    },
    {
      type: "input",
      name: "tests",
      message: "What command should be run to run tests?"
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the application?"
    },
    {
      type: "input",
      name: "contribution",
      message: "What does the user need to know about contributing to the repo?"
    },

  ]);
}

function generateMD(answers) {
  return `
  # ${answers.github}
  [![GitHub license](https://img.shields.io/badge/license-MIT-Blue.svg)](${answers.repo})
  
  ## Description
  ${answers.description}
  
  ${answers.appUrl}
  
  ## Table of Contents
  * [Usage](#Usage)
  * [User Story](#User-Story)
  * [Acceptance Criteria](#Acceptance-Criteria)
  * [Installation](#installation)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)
  
  ## Usage
  ${answers.usage}
  
  ## User Story
  ${answers.userStory}
  
  ## Acceptance Criteria
  ${answers.accptCriteria}
  
  ## Installation
  To install necessary dependencies, run the following command:
  ${answers.install} 
  
  ## License
  This project is licensed under the  ${answers.license} license.
  
  ## Contributing
  ${answers.contribution}
  
  ## Tests
  To run tests, run the following command:
  ${answers.tests}
  
  ## Questions
  
  If you have any quetions about the repo, open an issue or contact <img src="${answers.image}" width="25" height="25"> directaly at ${answers.email}.
  `;
}

promptUser()

  .then(function(answers) {
    const queryUrl = `https://api.github.com/users/${answers.github}`;
    axios
      .get(queryUrl)
      .then(function(res) {
        answers.image = res.data.avatar_url;
        if (res.data.email !== null) {
          answers.email = res.data.email;
        } else {
          answers.email = "timtanner@tanner-companies.com";
        };
        console.log(answers);
        const data = generateMD(answers);
        writeFileAsync("readme.md", data);
        console.log("Successfully wrote to readme.md");
      });
  })
  
  .catch(function(err) {
    console.log(err);
  });


// async function init() {
//   console.log("hi")
//   try {
//     const answers = await promptUser();

//     const queryUrl = `https://api.github.com/users/${answers.github}`;

//     axios
//       .get(queryUrl)
//       .then(function(res) {
//         answers.image = res.data.avatar_url;
//         if (res.data.email !== null) {
//           answers.email = res.data.email;
//         } else {
//           answers.email = "timtanner@tanner-companies.com";
//         };
//       });

//     const data = generateMD(answers);

//     await writeFileAsync("readme.md", data);

//     console.log("Successfully wrote to readme.md");
    
//   } catch(err) {
//     console.log(err);
//   }
// }

// init();
