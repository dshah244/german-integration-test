# Introduction

Prepare for German integration test by using Cypress.
There are 300+ questions which are provided to a person for practising purposes.

Cypress is used to automate everything BUT selecting the answer to a question. Features include

- Sorting the questions in a serial or in a random manner.
- Limiting the total number of questions to be practiced
- Answering a question in a time limited manner.
- Model test mode.

Visit [configuration](./cypress.env.json) file to find out the different manners in which to interact with the questionnaire.

## Setup

Clone or download the repository(using Github GUI) into the local workspace and navigate into it

```bash
git clone git@github.com:dshah244/german-integration-test.git
cd german-integration-test
```

For the next step, you need to have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed within your system.
Install the NPM dependencies required for the project.

```bash
npm install .
```

, after which run

```bash
npm run cy:open
```

A window would open where you could interact with elements

```bash
click on 'E2E Testing'
  -> click on browser of your liking (default Electron)
    -> click on 'oet-bamf.cy.ts'
```

Upon clicking on `oet-bamf.cy.ts`, the interface would start where the questions could be interacted with.

## Scenarios

Two scenarios are possible for practicing the questions

### General practice

User can define the details, such as

- German state in which the exam is being provided.
- range of questions, which need to be practiced, default 1-310.
- time in seconds to answer a question, default 30 seconds.
- time in seconds to review an answer, default 5 seconds.
- randomization of the questions, default false.

, within the [configuration](./cypress.env.json) file.

### Model test

Model test mode can be enabled to practice the questions as well.
To enable the mode, `modelTest` should be set to `true` within the [configuration](./cypress.env.json) file.

In this mode, configuration settings such as

- range of questions
- time to answer a question
- randomization of questions

, are **overridden**.

33 random questions are chosen from 310 available questions. 30 questions are general questions and the last three questions are state-specific questions.
~110 seconds are provided for a person to answer and review one question, so that the user has a maximum time of 60 minutes to answer the questions.

## Notes

- Basics of running [Cypress](https://docs.cypress.io/guides/getting-started/opening-the-app) could be helpful.
- If you are using WSL, you would need to install and enable X-server.
