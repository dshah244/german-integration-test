
const baseUrl = 'https://oet.bamf.de/ords/oetut/f?p=514:1:15762836149516:::::';
const startQuestion = <number>Cypress.env('startQuestion');
const endQuestion = <number>Cypress.env('endQuestion') + 1;
let arrayQuestionsDone: number[] = []


function uniqueRandomQuestionId(arrayQuestionsDone: number[]): number {
  let questionId =  randomQuestionId();
  while (true) {
    if (questionPerformed(questionId, arrayQuestionsDone)) {
      questionId =  randomQuestionId();
    }
    else {
      break;
    }
  }
  return questionId
}

function randomQuestionId(): number {
  return Math.floor(Math.random() * (endQuestion - startQuestion) + startQuestion)
}

function questionPerformed(questionId: number, arrayQuestionsDone: number[]): boolean {
  for (var oneQuestionId of arrayQuestionsDone) {
    if (oneQuestionId === questionId) {
      // return true if question is already answered.
      return true
    }
  }
  return false;
}

// for (let id = 1; id <= 310; id++) {
//   let questionId = uniqueRandomQuestionId(arrayQuestionsDone)
//   arrayQuestionsDone.push(questionId);
//   console.log(`questionId: ${questionId}`);
// }


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
      it(`Question ${questionId}`, function () {
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
