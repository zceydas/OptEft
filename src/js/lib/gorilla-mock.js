export default {
  store: () => {
    console.log(`Mocking Gorilla's 'store' method`)
  },
  finish: () => {
    console.log(`Mocking Gorilla's 'finish' method`)
  },
  metric: () => {
    // TODO save local data from experiment/index.js here
    console.log(`Mocking Gorilla's 'metric' method`)
  },
  populateAndLoad: () => {
    console.log(`Mocking Gorilla's 'populateAndLoad' method`)
  },
}
