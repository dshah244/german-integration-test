export class userInterface {
  readonly modelTest = <number>Cypress.env('modelTest');
  readonly region = <string>Cypress.env('region');

  startQuestion = <number>Cypress.env('startQuestion');
  endQuestion = <number>Cypress.env('endQuestion');
  randomizeQuestions = <boolean>Cypress.env('randomize');
  timeoutAnswer = <number>Cypress.env('timeout') * 1000;
  timeoutReviewAnswer = <number>Cypress.env('timeoutReviewAnswer') * 1000;

  constructor() {
    if (this.modelTest) {
      // model-test mode enabled.
      this.startQuestion = 1;
      this.endQuestion = 33;
      this.randomizeQuestions = true;

      // 60 x 60 seconds / 33 question ~ 110 secs/questions
      this.timeoutAnswer = 102.5 * 1000;
      this.timeoutReviewAnswer = 7.5 * 1000;
    }
  }
}

export class webSiteInfo {
  readonly baseUrl = 'https://oet.bamf.de/ords/oetut/f?p=514:1:15762836149516:::::';
  readonly minQuestionId = 1;
  readonly maxQuestionId = 310;
}
