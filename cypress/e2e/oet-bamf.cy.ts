
const baseUrl = 'https://oet.bamf.de/ords/oetut/f?p=514:1:15762836149516:::::';
const startQuestion = <number>Cypress.env('startQuestion');
const endQuestion = <number>Cypress.env('endQuestion');
let arrayQuestionsDone: number[] = []


function uniqueRandomQuestionId(arrayQuestionsDone: number[]): number {
  let questionId =  randomQuestionId();
  while (arrayQuestionsDone.includes(questionId)) {
    questionId =  randomQuestionId();
  }
  return questionId
}

function randomQuestionId(): number {
  return Math.round(( (Math.random()* 1000) / 1000 ) * (endQuestion - startQuestion)) + startQuestion;
}

describe('browse through questions', function () {
  before(function () {
    cy.visit(baseUrl);
    cy.get('#P1_BUL_ID').select(<string>Cypress.env('region'));
    cy.get('input[value="Zum Fragenkatalog"]').click();
  });
  context('Answer questions', function () {
    for (let id = startQuestion; id <= endQuestion; id++) {
      let questionId = id
      if (<boolean>Cypress.env('randomize')) {
        questionId = uniqueRandomQuestionId(arrayQuestionsDone);
      }
      arrayQuestionsDone.push(questionId);

      it(`${id}: Question ${questionId}`, function () {
        cy.get('#P30_ROWNUM').select(`${questionId}`, {force: true});
        cy.wait(1);
        cy.contains(
          'richtige Antwort =>',
          {timeout: <number>Cypress.env('timeout') * 1000}
        ).should('not.be.hidden');
        cy.wait(<number>Cypress.env('timeoutReviewAnswer') * 1000);
      });
    }
  });
});
