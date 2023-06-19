# Introduction

Prepare for German integration test by using Cypress.
There are 300+ questions which are provided to a person for practising purposes.

Cypress is used to automate everything BUT selecting the answer to a question.
The questions can be presented in a serial or in a random manner.
By default, a person has 30 seconds to answer a question and 5 seconds to review the answer.

Visit [configuration](./cypress.env.json) file to find out the different manners in which to interact with the questionnaire.


# Setup

You need to have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed within your system and basics of running [Cypress](https://docs.cypress.io/guides/getting-started/opening-the-app).

After the installation, clone the repository into your local workspace and simply run

```
npm install .
```
, after which run

```
npm run cy:open
```
, select `E2E Testing`, choose any browser of your liking, start the tests, and finally click on `oet-bamf`.


**NOTE**: If you are using WSL, you would need to install and enable X-server.
