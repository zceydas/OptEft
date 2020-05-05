export const _$CONFIG = {
  time: {
    answer: 5000,
    feedback: 2000,
    fixation: 2000,
  },
  phase: 1,
  endPhaseInstructions: {
    phase1: 'Phase 1 instructions',
    phase2: 'Phase 2 instructions',
  },
  inventoryQuestions: [
    'I would love to solve math questions of that kind.',
    'I was strongly involved in the task.',
    'I was thrilled.',
    'The task was boring.',
    'I had the necessary skill to solve the calculations successfully.',
    'Task demands were well matched to my ability.',
    'During the task all thoughts on task-irrelevant issues that I am personally concerned with were extinguished.',
    'During the task my consciousness was completely focused on solving the math calculations.',
    'Time passed really quickly.',
    'How much are you willing to spend to AVOID repeating this block? Indicate below:',
  ],
}

export const _$difficultyLetter = ['Y', 'P', 'A', 'I']

export const _$SESSIONMODEL = {
  id: null,
  phases: [
    // {
    //   name: 'capacity',
    //   responses: [],
    //   datetime: null,
    //   tasklevels: [],
    // },
    // {
    //   name: 'easy',
    //   responses: [],
    //   datetime: null,
    // },
    // {
    //   name: 'intermediate',
    //   responses: [],
    //   datetime: null,
    // },
    // {
    //   name: 'difficult',
    //   responses: [],
    //   datetime: null,
    // },
  ],
}

export const _$RESPONSEMODEL = {
  trial: 0,
  level: 1,
  answer: '',
  accuracy: 0,
  RT: 0,
  equation: '',
}

export const _$ACCURACY = {
  correct: {
    label: 'Correct',
    class: 'success',
    value: 1,
  },
  incorrect: {
    label: 'Incorrect',
    class: 'error',
    value: 0,
  },
  tooSlow: {
    label: 'Too Slow',
    class: 'error',
    value: 0,
  },
}

export const _$SCENES = {
  fixation: {
    name: 'fixation',
    position: 0,
    active: true,
    selector: '#fixation',
  },
  equations: {
    name: 'equations',
    position: 1,
    active: true,
    selector: '#equations',
  },
  accuracyDisplay: {
    name: 'accuracy-display',
    position: 2,
    active: true,
    selector: '#accuracy-display',
  },
  endCapacityScreen: {
    name: 'endCapacity-screen',
    position: 3,
    active: true,
    selector: '#endCapacity-screen',
  },
}

export const _$INSTRUCTIONS = {
  welcome: `<div class="text-center"><h1>Welcome!</h1></div>
      <div class="text-left">
      READ the instructions carefully!
      <br />
      <br />
      This experiment consists of 6 Blocks.
      In each Block, you will solve arithmetic questions of varying difficulty.
      Block # 1 will be the longest one and might take up to 30 minutes. Subsequent Blocks will take around
      5 minutes each.
      <br />
      <br />
      In this task, we are interested in the EFFORT you put in solving each question and
      how much you LIKE or DISLIKE solving them. Your ACCURACY does not affect
      your payment, and your performance does not change the course of the experiment. 
      Although your honest effort matters!
      So, DO NOT use calculators, pen & paper to solve the questions or guess the answers.
      If you use a calculator or show any unusual behavior, our algorithm will REJECT your participation
      and you will NOT get paid.
    </div>`,

  welcome2: `
    <div class="text-left">
      <br />
      <br />
      <br />
      On each trial, first you will see a fixation cross (+).
      During this screen, keep your eyes on the screen and 
      wait for the next question to show up. Then solve the question in your mind. 
      Be as fast and accurate as possible. 
      Enter your answer in the blank field, and then press ENTER to submit your response. 
      Please note: failing to follow these instuctions will lead to the rejection of your 
      participation. Now, please put your phones away and put your browser in FULL SCREEN MODE, 
      then click START to begin.
    </div>`,

  offer1: ` <div class="text-left">
    We appreciate your participation in our study and we would like to 
    make your experience even better!
    So we decided to make an offer to you! 
    <br/> <br/>
    The last Block (Block # 6) will ONLY consist of arithmetic questions
    you prefer to solve! That means you can AVOID solving question types 
    you don't want to solve! 
    <br/> <br/>
    To allow for that, we give you extra money (3.1 Euros) 
    you can spend to AVOID REPEATING the type of questions you solved. 
    By spending more of your extra money on avoiding a question type, 
    you will make that question type LESS LIKELY to REPEAT as your last Block.
      <br/> <br/>
    In the next screen, we will ask you indicate the maximum amount of money (up to 3.1 euros) 
    you would be willing to spend in order to AVOID the type of questions you just solved.
    <br/> <br/>
    After you indicate how much of your extra money you are willing to 
    use for avoiding this type of question, 
    we will randomly draw a number between 0 and 3.1 euros.
    If the number we draw is greater than yours, 
    then you will have to REPEAT this type of 
    question without spending money. 
    However, if the number I draw is equal to or less than yours, 
    you will AVOID REPEATING this 
    question type by spending the money we drew.
    <br/> <br/>
    It's actually really simple: you don't want to repeat this block? spend more of your extra money.
    You want to repeat this block? Spend less of your money. 
    <br/> <br/>
    We will make the same offer to you after you complete each subsequent block, 
    so you will get to indicate how much you would spend to avoid other question types as well!
    One of your responses to these questions will be randomly selected and influence your final block and 
    your extra pay! And you have 3.1 euros to spend for each question type and not in total!
      <br/> <br/>
    Please note that your ACCURACY in solving the arithmetic questions
    DOES NOT AFFECT whether you will earn the extra amount as long as you TRY YOUR BEST
    and continue solving each block in your mind and without guessing or using any other tools.
    </div>`,

  offerRest: `<div class="text-left">
    Please make the same AVOID decision for this block. 
    <br/> <br/>
    Remember: After you indicate how much of your extra money you are willing to 
    use for avoiding this type of question, 
    we will randomly draw a number between 0 and 3.1 euros.
    If the number we draw is greater than yours, 
    then you will have to REPEAT this type of 
    question without spending money. 
    However, if the number I draw is equal to or less than yours, 
    you will AVOID REPEATING this 
    question type by spending the money we drew.
    <br/> <br/>
    It's actually really simple: you don't want to repeat this block? spend more of your extra money.
    You want to repeat this block? Spend less of your money.     
    <br/> <br/>
     Please note that your ACCURACY in solving the arithmetic questions
    DOES NOT AFFECT whether you will earn the extra amount as long as you TRY YOUR BEST
    and continue solving each block in your mind and without guessing or using any other tools.
    </div>`,

  bonus: `Great! You completed the experiment! 
    Your extra pay will be determined based on your responses and reflected on your pay.
    Thank you for your participation!`,

  exit: `Moving onto inventories...`,
}

// export default {
//   _$ACCURACY,
//   _$CONFIG,
//   _$difficultyLetter,
//   _$INSTRUCTIONS,
//   _$RESPONSEMODEL,
//   _$SCENES,
//   _$SESSIONMODEL,
// }
