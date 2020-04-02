export const _$CONFIG = {
  time: {
    answer: 5000,
    feedback: 2000,
    fixation: 2000
  },
  phase: 1,
  endPhaseInstructions: {
    phase1: "Phase 1 instructions",
    phase2: "Phase 2 instructions"
  },
  inventoryQuestions: [
    "I would love to solve math questions of that kind.",
    "I was strongly involved in the task.",
    "I was thrilled.",
    "The task was boring.",
    "I had the necessary skill to solve the calculations successfully.",
    "Task demands were well matched to my ability.",
    "During the task all thoughts on task-irrelevant issues that I am personally concerned with were extinguished.",
    "During the task my consciousness was completely focused on solving the math calculations.",
    "Time passed really quickly."
  ]
};

export const _$difficultyLetter = ["Y", "P", "A", "I"];

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
  ]
};

export const _$RESPONSEMODEL = {
  trial: 0,
  level: 1,
  answer: "",
  accuracy: 0,
  RT: 0,
  equation: ""
};

export const _$ACCURACY = {
  correct: {
    label: "Correct",
    class: "success",
    value: 1
  },
  incorrect: {
    label: "Incorrect",
    class: "error",
    value: 0
  },
  tooSlow: {
    label: "Too Slow",
    class: "error",
    value: 0
  }
};

export const _$SCENES = {
  fixation: {
    name: "fixation",
    position: 0,
    active: true,
    selector: "#fixation"
  },
  equations: {
    name: "equations",
    position: 1,
    active: true,
    selector: "#equations"
  },
  accuracyDisplay: {
    name: "accuracy-display",
    position: 2,
    active: true,
    selector: "#accuracy-display"
  },
  endCapacityScreen: {
    name: "endCapacity-screen",
    position: 3,
    active: true,
    selector: "#endCapacity-screen"
  }
};

export const _$INSTRUCTIONS = {
  welcome: `<div class="text-center"><h1>Welcome!</h1></div>
      <br />
      <div class="text-left">
        This experiment consists of 10 blocks.
        In each block, you will solve arithmetic questions of varying difficulty.
        Please solve each question in your mind and respond as accurately and as quickly
        as you can. 
        <br />
        <br />
        Enter your answer in the blank field and then press enter to move onto
        the next question. Now, click START to begin.
      </div>`,

  offer: `Now we would like to make an offer to you: 
      <br/> <br/>
      The final block (Block # 10) will make extra
      money for you and will only consist of the arithmetic questions of YOUR CHOICE. In the next
      screen, you will get to Accept or Reject an offer. 
      <br/> <br/>
      By Accepting an offer, you indicate that you
      accept to repeat this Block as your final block (Block # 10) in exchange for the offered amount.
      If you Reject all offers, we will randomly determine the amount of your extra pay and
      the type of arithmetic questions you need to complete in Block # 10.
      <br/> <br/>
      Please note that your accuracy in Block # 10
      DOES NOT AFFECT whether you will earn the offered amount as long as you TRY YOUR BEST.`,

  exit: `The experiment is over! 
      <br/> <br/>
      Thank you for your participation!.`
};

// export default {
//   _$ACCURACY,
//   _$CONFIG,
//   _$difficultyLetter,
//   _$INSTRUCTIONS,
//   _$RESPONSEMODEL,
//   _$SCENES,
//   _$SESSIONMODEL,
// }
