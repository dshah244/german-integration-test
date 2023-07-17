# Introduction

Prepare for German integration test by using Cypress.
There are 300+ questions which are provided to a person for practising purposes.

Cypress is used to automate everything BUT selecting the answer to a question. Features include

- Sorting the questions in a serial or in a random manner.
- Limiting the total number of questions to be practiced
- Answering a question in a time limited manner.

By default, a person has 30 seconds to answer a question and 5 seconds to review the answer, which could be changed.

Visit [configuration](./cypress.env.json) file to find out the different manners in which to interact with the questionnaire.

## Setup

You need to have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed within your system. After the installation, clone the repository into your local workspace and simply run

```bash
npm install .
```

, after which run

```bash
npm run cy:open
```

A window would open where you could perform the following steps

```bash
click on 'E2E Testing'
  -> click on browser of your liking (default Electron)
    -> click on 'oet-bamf.cy.ts'
```

Upon clicking on `oet-bamf.cy.ts`, the interface would start where the questions could be interacted with.

## Notes

- Basics of running [Cypress](https://docs.cypress.io/guides/getting-started/opening-the-app) could be helpful.
- If you are using WSL, you would need to install and enable X-server.
