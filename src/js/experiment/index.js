/* tslint:disable */
// import gorilla = require('gorilla/gorilla');
import gorilla from '../lib/gorilla-mock'

import $ from 'jquery'

import {
  _$ACCURACY,
  _$CONFIG,
  _$difficultyLetter,
  _$INSTRUCTIONS,
  _$RESPONSEMODEL,
  _$SCENES,
  _$SESSIONMODEL,
} from './config.js'

import regression from './regression.js'

import { generateEquation } from './equations.js'

export function optEft() {
  const $SCENES = $('.scene')
  const $EQUATION_FORM = $('form#equation')
  const $INPUT_ANSWER = $EQUATION_FORM.find(':input').eq(0)
  const $ACCURACY_DISPLAY = $('#accuracy-display')
  const $OFFERSCENE = $('#offer-scene')
  const $INFOSCENE = $('#info-scene')
  const $NEWPHASESCENE = $('#new-phase-scene')
  const $MODAL = $('#modal')
  const maxBlock = 10 // should be 10

  let _choiceResult = []
  let _currentScene = null
  let _taskID = 'Block #2'
  let _expPhases = [1, 2, 3, 4, 1, 2, 3, 4]
  _expPhases = shuffle(_expPhases)
  let _difficultyLetter = shuffle(_$difficultyLetter)
  const noTrialsToAvg = 4 // this is the number of trials needed in Capacity _phase to move on to the next difficulty level
  const maxTrials = 10 // maximum number of trials to present in the experimental conditions
  const data = [
    [1, 1],
    [1, 2],
    [0.5, 3],
    [0.75, 4],
    [0.25, 5],
    [0, 6],
  ]

  let _fitresult = regression.polynomial(data, { order: 2 })

  let _easyTaskDifficulty = _fitresult.predict(0.8)
  let _intermediateTaskDifficulty = _fitresult.predict(0.5)
  let _difficultTaskDifficulty = _fitresult.predict(0.2)

  console.log(_easyTaskDifficulty[1], Math.round(_easyTaskDifficulty[1]))

  let _tasklevels = []
  let _clock
  let _previousLevel
  // S
  let _currentLevel = 1
  // S
  let _trialcounter = 0
  // S
  let _extraMoney
  let _currentEquation = ''
  let _equationStart
  // S
  let _RT = 0
  let _accCounter = []
  let _avgCounter = []
  let _responseData = JSON.parse(JSON.stringify(_$RESPONSEMODEL))
  let _phase = 0
  let _offers = []
  let _offerAmount = offerAmount()
  let _offerAmountCount = 0
  let _offerStartTime = 0
  var _my_data
  // _OfferAmount are the offer amounts for the discounting phase
  // each offer is presented 3 times, and needs to be shuffled at each phase
  // should be i< 31
  function offerAmount() {
    let offerAmount = []
    for (var i = 0; i < 3; i++) {
      offerAmount[i] = Math.round((i * 0.1 + 0.1) * 100) / 100
    }
    offerAmount = offerAmount.concat(offerAmount, offerAmount)

    return offerAmount
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function transition(sceneIndex) {
    let time = 1000 //2000 + 1000 * Math.random()
    _currentScene = $SCENES.eq(sceneIndex)
    _currentScene.show()
    switch (sceneIndex) {
      case 0:
        if (_phase > 1 && _trialcounter === 0) {
          // console.log('_phase > 1 && _trialcounter === 1')
          time = 3000 //4000 + 1000 * Math.random()
          setFixationIcon(_taskID)
          setTimeout(() => {
            setFixationIcon('+')
          }, 1999)
        } else if (_phase > 1 && _trialcounter > 0) {
          //  console.log('_phase > 1 && _trialcounter > 1')
          time = 3000 // 2000 + 4000 + 18000 - _RT
          setFixationIcon(_taskID)
          setTimeout(() => {
            setFixationIcon('+')
          }, 1999)
        }
        _trialcounter = _trialcounter + 1

        break
      case 1:
        $('#equation-display').text(_currentEquation)
        time = 18000
        setTimeout(function() {
          $INPUT_ANSWER.focus()
        }, 10)
        _equationStart = performance.now() // Date.now()
        _currentEquation = generateEquation(_currentLevel)

        $('#equation-display').text(_currentEquation)
        break
      case 2:
        // Default to prepare next trial by setting sceneIndex to -1 to increment to 0 (fixation)
        sceneIndex = -1
        determineAccuracy()
        //  console.log('CurrentLevel at Accuracy: ', _currentLevel)
        _previousLevel = _currentLevel
        console.log('PHASE#:', _phase)
        if (_trialcounter % noTrialsToAvg === 0 && _phase === 1) {
          // below increases the difficulty of the task every 8 trials
          $INFOSCENE.hide()
          $OFFERSCENE.hide()
          const capacityReached = hasReachedCapacity()
          if (capacityReached) {
            sceneIndex = 2
          }
          // return to avoid the rest of the func which will continue transition
        } else if (_trialcounter === maxTrials && _phase > 1) {
          // phase also gets incremented in the hasReachedCapacity
          sceneIndex = 2
        }
        break
      case 3:
        // _trialcounter = 0_
        _offerAmount = shuffle(_offerAmount)
        // if (_phase > 1) {
        //   // when the previous phase ends, a new phase with a new difficulty level begins
        //   _currentLevel = determinePhaseType(_phase)
        // if it's beyond the Capacity phase and the maximum number of experimental trials are reached
        if (_trialcounter === maxTrials && _phase > 1) {
          // start the offer and inventory epoch and increment the phase
          // CHECK THIS
          if (_phase - 1 === maxBlock) {
            /// !!! here we need to end the experiment and add another Modal that reports the ExtraMoney
            // !!! selected level might not be correct
            $('#scenes').hide()
            $('#exit-scene').show()
            //DisplayFinish() // I don't like this.
          } else {
            setupOffer(0)
            setupQuestionaire()
            _currentLevel = determinePhaseType()
          }
        }

        break
    }

    if (sceneIndex !== 3) {
      // hide the current scene once the deadline passes
      _clock = setTimeout(function() {
        timer(sceneIndex + 1)
      }, time)
    }
  }

  function timer(sceneIndex) {
    _currentScene.hide()
    transition(sceneIndex)
  }

  function startPhase() {
    const index = _phase
    _phase = _phase + 1
    _taskID = 'Block # ' + _phase //_difficultyLetter[phaseType - 1]
    if (!_$SESSIONMODEL.phases[index]) {
      // _$SESSIONMODEL.phases[_phase - 1]
      _$SESSIONMODEL.phases[index] = {
        responses: [],
        tasklevels: [],
        offers: [],
        inventory: [],
      }
    }
    _trialcounter = 0
  }

  function determinePhaseType() {
    let phaseType = _expPhases[_phase - 1]

    // startPhase()
    if (phaseType === 1) {
      _currentLevel = 1
    } else if (phaseType === 2) {
      _currentLevel = _easyTaskDifficulty
    } else if (phaseType === 3) {
      _currentLevel = _intermediateTaskDifficulty
    } else if (phaseType === 4) {
      _currentLevel = _difficultTaskDifficulty
    }
    console.log(
      'ExpPhases: ',
      _expPhases,
      'PHASE_VAL: ',
      _phase - 1,
      'PHASE_TYPE: ',
      phaseType,
      'CURRENT_LEVEL: ',
      _currentLevel,
    )
    return _currentLevel
  }

  function hasReachedCapacity() {
    console.log('Trial#: ', _trialcounter)
    console.log('Phase#: ', _phase)
    let capacityReached = false
    if (_trialcounter % noTrialsToAvg === 0) {
      _currentLevel = _currentLevel + 1
      let sum = 0
      _accCounter.forEach((v, i) => {
        sum += v
      })
      const avg = sum / _accCounter.length
      console.log('AverageAcc: ', avg)
      _avgCounter.push([avg, _trialcounter / noTrialsToAvg])
      // below the _phase ends when the participant scored 0% at a difficulty level
      if (avg === 0) {
        // at the end of the capacity _phase, the new experimental _phases should start
        // determine capacity of the participant here
        determineCapacity()
        startPhase()
        capacityReached = true
      }
      _accCounter = []

      return capacityReached
    } else {
      _currentLevel = _currentLevel

      return false
    }
  }

  function determineCapacity() {
    // below we fit participant's data with a polynomial function and infer the
    // difficulty levels of the upcoming _phases
    // startPhase()
    console.log('AVERAGE_ACC:', _avgCounter)
    _fitresult = regression.polynomial(_avgCounter, { order: 2 })
    _easyTaskDifficulty = Math.round(_fitresult.predict(0.8)[1]) // add Math.round to this !!!
    _intermediateTaskDifficulty = Math.round(_fitresult.predict(0.5)[1])
    _difficultTaskDifficulty = Math.round(_fitresult.predict(0.2)[1])
    _tasklevels.push(
      Math.round(_easyTaskDifficulty[1]),
      Math.round(_intermediateTaskDifficulty[1]),
      Math.round(_difficultTaskDifficulty[1]),
    )
    console.log('TaskDifficulties: ', _easyTaskDifficulty, _intermediateTaskDifficulty, _difficultTaskDifficulty)
    _currentLevel = determinePhaseType()
  }

  function saveInventory(questions) {
    // TODO: Keep track of phase increment better!
    _$SESSIONMODEL.phases[_phase - 1].inventory = questions
    // SAVE: localStorage for dev env
    localStorage.setItem('SessionData', JSON.stringify(_$SESSIONMODEL))
    // SAVE: Gorilla API
    gorilla.store('SessionData', _$SESSIONMODEL, true)

    $('.slider').val(50)
    // TODO: Reset sliders!
    // localStorage.setItem(`QuestionaireData-Phase-${_phase}`, JSON.stringify($('.slider').serializeArray()))
  }

  function safelyParseJSON(json) {
    // This function cannot be optimised, it's best to
    // keep it small!
    var parsed

    try {
      parsed = JSON.parse(json)
    } catch (e) {
      // Oh well, but whatever...
    }

    return parsed // Could be undefined!
  }

  function saveOffer() {
    _$SESSIONMODEL.phases[_phase - 1].offers = _offers
    // SAVE: Local development
    localStorage.setItem('SessionData', JSON.stringify(_$SESSIONMODEL))
    // SAVE: Gorilla API
    gorilla.store('SessionData', _$SESSIONMODEL, true)
    _my_data = safelyParseJSON(localStorage.getItem('SessionData'))
  }

  function saveResponse() {
    // performance during arithmetic summations
    _RT = performance.now() - _equationStart // Date.now() - _equationStart
    _responseData.level = _currentLevel
    _responseData.trial = _trialcounter
    _responseData.RT = _RT
    _responseData.equation = _currentEquation
    _$SESSIONMODEL.phases[_phase - 1].responses.push(_responseData)
    _$SESSIONMODEL.phases[_phase - 1].tasklevels.push(_tasklevels)
    gorilla.store('SessionData', _$SESSIONMODEL)
    gorilla.metric({
      level: _currentLevel,
      trial: _trialcounter,
      RT: _RT,
      equation: _currentEquation,
    })
    _responseData = {
      trial: _trialcounter,
      level: _currentLevel,
      answer: '',
      accuracy: 0,
      RT: 0,
      equation: '',
    }

    // _expPhases // experimental task order under user

    // // offer phase data
    // _offerData = {
    //   trial: 0,
    //   offerAmount: 0,
    //   accept: 0,
    // }

    // // inventory responses
    // _inventoryData = {
    //   question: '',
    //   response: 0,
    // }

    // SAVE: Local dev
    localStorage.setItem('SessionData', JSON.stringify(_$SESSIONMODEL))
    // SAVE: Gorilla API
    gorilla.store('SessionData', _$SESSIONMODEL, true)
    // console.log(gorilla.retrieve('SessionData'))
  }

  function determineAccuracy() {
    // below keep track of response time since the equation presentation

    let accuracy = _$ACCURACY.incorrect
    _responseData.answer = $INPUT_ANSWER.val()
    let outcome = eval(_currentEquation)

    if (outcome === parseInt(_responseData.answer)) {
      accuracy = _$ACCURACY.correct
    }
    if (_responseData.answer.trim() === '') {
      accuracy = _$ACCURACY.tooSlow
    }

    _responseData.accuracy = accuracy.value

    _accCounter.push(_responseData.accuracy)

    saveResponse()

    $INPUT_ANSWER.val('')
    $ACCURACY_DISPLAY.text(accuracy.label)

    Object.keys(_$ACCURACY).forEach(o => {
      $ACCURACY_DISPLAY.removeClass(_$ACCURACY[o].class)
    })

    $ACCURACY_DISPLAY.addClass(accuracy.class)

    clearTimeout(_clock)
    // savedata()
  }

  function setFixationIcon(letter = '+') {
    $('#fixation')
      .find('.icon')
      .text(letter)
  }

  function setupOffer(i) {
    if (i === 0) {
      $ACCURACY_DISPLAY.hide()
      $NEWPHASESCENE.hide()
      $INFOSCENE.hide()
      useModal(_$INSTRUCTIONS.offer)
      $OFFERSCENE.show()
    }
    // TODO if _offerAmount reached hide this form
    if (i === _offerAmount.length) {
      // console.log()
      // $INFOSCENE.hide()
      $OFFERSCENE.hide()
      inventoryQuestionText()
      $INFOSCENE.show()
      _offerAmountCount = 0
      saveOffer()
    } else {
      $OFFERSCENE.find('.offer-title').hide()

      $OFFERSCENE.find('.offer-amount').html(_offerAmount[i].toFixed(2))
      _offerStartTime = performance.now() //Date.now()
      $OFFERSCENE.find('.offer-title').fadeIn(() => {
        $('.offer-button').fadeIn()
        $OFFERSCENE.find('.task-id').html('Do you accept to repeat ' + _taskID + ' for the offer amount:')
      })
    }
    _offerAmountCount += 1
  }

  function setupQuestionaire() {
    let currentEq = 0
    const form = $('#questionaire-form')
    _$CONFIG.inventoryQuestions.forEach((q, i) => {
      form.prepend(`
        <div class="questionaire-layout">
          <label for="qf-${i}"><h1>${q}</h1></label>
          <br />
          <div class="questionaire-input">
            <span class="min-text">Disagree</span>
            <input type="range" class="slider" id="qf-${i}" name="qf-${i}" min="0" max="100">
            <span class="max-text">Agree</span>
          </div>
        </div>
        </div>
      `)
    })

    const ql = $('.questionaire-layout')
    const btn = $('#questionaire-next-button')
    const submitBtn = $('#questionaire-submit-button')

    ql.hide()
    ql.eq(currentEq).show()
    submitBtn.hide()

    btn.show().click(e => {
      e.preventDefault()
      currentEq += 1
      ql.hide()
      ql.eq(currentEq).show()

      if (currentEq === 8) {
        btn.hide()
        // submitBtn.show()
        // $INFOSCENE.hide()
        // $('.instructions').show()
        submitBtn.show()

        if (_phase - 1 === _expPhases.length) {
          console.log('PHASE: ' + _phase, 'LengthExpArray: ' + _expPhases.length)
          const randomPick = _choiceResult[Math.floor(Math.random() * _choiceResult.length)]
          console.log('RANDOM_PICK: ', randomPick)
          _expPhases.push(randomPick[1]) // this gets updated correctly but determinePhase comes before this and breaks everything !!!
          _extraMoney = randomPick[0]
          _currentLevel = determinePhaseType()
          console.log('ExpPhases:', _expPhases)
          console.log('ExtraMoney: ', _extraMoney)
        }
      }
    })
  }

  function useModal(text) {
    $MODAL.find('#modal-content-text').html(text)
    $MODAL.fadeIn()
  }

  // at the end of the first block, this text doesn't show !!!
  function newPhaseSceneText() {
    $NEWPHASESCENE
      .find('.instructions')
      .text('You completed Block #' + (_phase - 1) + '.' + ' Click START to start Block #' + _phase)
  }

  function inventoryQuestionText() {
    $INFOSCENE
      .find('.infoQuest-id')
      .text(
        'Please also state your agreement on the statements below regarding your experience during the arithmetic questions in Block #' +
          _phase,
      )
  }

  function DisplayFinish() {
    gorilla.finish()
  }

  // gorilla.refreshLayout()
  startPhase()
  $('#exit-scene').hide()

  // transition starts when the button is pressed (welcome screen)
  $('.start-button').on('click keypress', e => {
    e.preventDefault()
    $('#welcome-screen').hide()
    transition(0)
  })

  // transition starts when the button is pressed (welcome screen)
  $('.phase-continue-button').on('click keypress', e => {
    e.preventDefault()
    $NEWPHASESCENE.hide()
    transition(0)
  })

  $('.offer-button').on('click keypress', e => {
    e.preventDefault()
    setupOffer(_offerAmountCount)
    _offers.push({
      amount: _offerAmount[_offerAmountCount],
      choice: e.target.getAttribute('value'),
      RT: performance.now() - _offerStartTime,
    })

    if (_offers[_offers.length - 1].choice === '1') {
      _choiceResult.push([_offers[_offers.length - 1].amount, _previousLevel])
    }
    console.log(_choiceResult)
    $('.offer-button').hide()
  })

  // show answer accuracy
  $EQUATION_FORM.submit(e => {
    e.preventDefault()
    if ($INPUT_ANSWER.val() === '') {
      return
    }
    timer(2)
  })

  // show answer accuracy
  $('#questionaire-submit-button').on('click keypress', e => {
    e.preventDefault()
    saveInventory($('.slider').serializeArray())
    $INFOSCENE.hide()
    startPhase()
    newPhaseSceneText() // the function that pastes the phase number in the info text
    $NEWPHASESCENE.show()
  })

  $('#welcome-screen')
    .find('.message')
    .html(_$INSTRUCTIONS.welcome)

  // Close modal
  window.onclick = e => {
    if ($MODAL.is(e.target) || $(e.target).hasClass('modal-close')) {
      $MODAL.hide()
    }
  }
}

// In Gorilla: main.js.ts line 3: Module '"optEft.js"' has no default export.
// export default optEft
