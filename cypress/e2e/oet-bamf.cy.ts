
const baseUrl = 'https://oet.bamf.de/ords/oetut/f?p=514:1:15762836149516:::::';
const minQuestionId = 1;
const maxQuestionId = 310;

const startQuestion = <number>Cypress.env('startQuestion');
const endQuestion = <number>Cypress.env('endQuestion');
let questionsDone: number[] = []

/**
 * Return unique random question ID from a list of questions.
 * @param startQuestionNumber Start question number from list of 310 questions.
 * @param endQuestionNumber End question number from list of 310 questions.
 * @param questionsDone List consisting of uniques question IDs already covered.
 * @returns
 */
function uniqueRandomQuestionId(
  startQuestionNumber: number,
  endQuestionNumber: number,
  questionsDone: number[]
): number {
  let questionId =  _randomizeId(startQuestionNumber, endQuestionNumber);
  while (questionsDone.includes(questionId)) {
    questionId =  _randomizeId(startQuestionNumber, endQuestionNumber);
  }
  return questionId
}

/**
 * Return a random number present within the range of provided IDs.
 * @param startId
 * @param endId
 * @returns
 */
function _randomizeId(startId: number, endId: number): number {
  return Math.round( Math.random() * (endId - startId)) + startId;
}

describe('Validate user inputs', function () {
  it('Range: Questions', function () {
    expect(startQuestion).lessThan(endQuestion);

    // Questions between 1-310
    expect(startQuestion).greaterThan(minQuestionId - 1);
    expect(endQuestion).greaterThan(minQuestionId - 1);
    expect(startQuestion).lessThan(maxQuestionId + 1);
    expect(endQuestion).lessThan(maxQuestionId + 1);
  })
})

describe('Integration questions', function () {
  before(function () {
    cy.visit(baseUrl);
    cy.get('#P1_BUL_ID').select(<string>Cypress.env('region'));
    cy.get('input[value="Zum Fragenkatalog"]').click();
  });

  context('Questions list', function () {
    for (let id = startQuestion; id <= endQuestion; id++) {
      let questionId = id
      if (<boolean>Cypress.env('randomize')) {
        questionId = uniqueRandomQuestionId(startQuestion, endQuestion, questionsDone);
      }
      questionsDone.push(questionId);

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
