import { userInterface, webSiteInfo } from "../support/defines";

let questionsDone: number[] = [];
let ui = new userInterface();
let info = new webSiteInfo();

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
    expect(ui.startQuestion).lessThan(ui.endQuestion);

    // Questions between 1-310
    expect(ui.startQuestion).greaterThan(info.minQuestionId - 1);
    expect(ui.endQuestion).greaterThan(info.minQuestionId - 1);
    expect(ui.startQuestion).lessThan(info.maxQuestionId + 1);
    expect(ui.endQuestion).lessThan(info.maxQuestionId + 1);
  })
})

describe('Integration questions', function () {
  before(function () {
    cy.visit(info.baseUrl);
    cy.get('#P1_BUL_ID').select(ui.region);
    cy.get('input[value="Zum Fragenkatalog"]').click();

  });

  context('Questions list', function () {
    for (let id = ui.startQuestion; id <= ui.endQuestion; id++) {
      // model test OFF + randomize OFF
      let questionId = id
      if (ui.modelTest) {
        // model test ON
        if (id <= 30) {
          // 30 general questions
          questionId = uniqueRandomQuestionId(info.minQuestionId, info.generalQuestions, questionsDone);
        } else {
          // 3 state specific questions
          questionId = uniqueRandomQuestionId(info.generalQuestions + 1, info.maxQuestionId, questionsDone);
        }
      } else if (ui.randomizeQuestions) {
        // model test OFF + randomize ON
        questionId = uniqueRandomQuestionId(ui.startQuestion, ui.endQuestion, questionsDone);
      }
      questionsDone.push(questionId);

      it(`${id}: Question ${questionId}`, function () {
        cy.get('#P30_ROWNUM').select(`${questionId}`, {force: true});
        cy.wait(1);
        cy.contains('richtige Antwort =>', {timeout: ui.timeoutAnswer}).should('not.be.hidden');
        cy.wait(ui.timeoutReviewAnswer);
      });
    }
  });
});
