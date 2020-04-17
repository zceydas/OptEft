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
    'How much money would you be willing to forego to avoid repeating this block?',
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
    <br />
    <div class="text-left">
      This experiment consists of 6 Blocks.
      In each Block, you will solve arithmetic questions of varying difficulty.
      Block # 1 will be the longest one  and take around 30 minutes. Following Blocks will take around
      5 minutes each.
      <br />
      <br />
      In this task, we are merely interested 
      in how much you like or dislike solving arithmetic questions. Your accuracy does not affect
      your payment, and your performance does not change the course of the experiment.
      So, please do not use calculators, or pen & paper to solve the questions.
      If you use a calculator or show any unusual behavior, our algorithm will flag your participation.
      <br />
      <br />
      On each trial, first you will see a fixation cross (+).
      During this screen, keep your eyes on the screen and 
      wait for the next question to show up. Then solve the question in your mind. 
      Enter your answer in the blank field, and then press ENTER to move onto
      the next question. Now, please put your phones away, and click START to begin.
    </div>`,

  offer1: `Now we would like to make an offer to you: 
    <br/> <br/>
    We will give you an extra 3.1 Euros BONUS. In exchange, you will complete an additional
    block (Block # 6) of arithmetic questions. 
    <br/> <br/>
    But you will have the option to decide the
    type of arithmetic questions the last block will consist of.  
    <br/> <br/>
    In the next screen, you will get to indicate how much of this extra 3.1 Euros you would
    be willing to let go to AVOID the type of aritmetic question you just performed.
    And we will ask the same question to you after you complete EACH BLOCK : each question type.
    <br/> <br/>
    Based on how much of your money you'd be willing to spend on avoiding each question type,
    we will determine the LIKELIHOOD you will solve that question type for your last block. 
    As a result, you will receive the amount you chose to discount for that question type. 
    <br/> <br/>
    Please note that your accuracy in performing the arithmetic questions
    DOES NOT AFFECT whether you will earn this BONUS amount as long as you TRY YOUR BEST.`,

  offerRest: `Please make the same BONUS decision for this question type and decide the
  type of arithmetic questions the last block will consist of. 
    <br/> <br/>
    Please keep in mind that your accuracy in performing the arithmetic questions
    DOES NOT AFFECT whether you will earn this BONUS amount as long as you TRY YOUR BEST.`,

  exit: `The experiment is over! 
    <br/> <br/>
    Thank you for your participation!.`,
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
