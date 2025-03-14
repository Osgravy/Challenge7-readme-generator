// Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a short description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage information?',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'What are the contribution guidelines?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What are the test instructions?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'What license will you use?',
        choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    }
];

// Function to write README file
function writeToFile(fileName, data) {
    const content = `
# ${data.title}

${renderLicenseBadge(data.license)}

## Description

${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## Contribution

${data.contribution}

## Tests

${data.tests}

## License

${renderLicenseSection(data.license)}

## Questions

If you have any questions, please contact me at [${data.email}](mailto:${data.email}). 
You can also find my GitHub profile here [${data.github}](https://github.com/${data.github}).
    `;

    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('README file created successfully!');
        }
    });
}

// Function to render license badge
function renderLicenseBadge(license) {
    if (license === 'None') {
        return '';
    }
    return `![License](https://img.shields.io/badge/License-${license}-blue.svg)`;
}

// Function to render license section
function renderLicenseSection(license) {
    if (license === 'None') {
        return 'This project is not licensed.';
    }
    return `This project is licensed under the ${license} license.`;
}

// Function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            writeToFile('README.md', answers);
        })
        .catch((error) => {
            console.error('Error initializing app:', error);
        });
}

// Function call to initialize app
init();