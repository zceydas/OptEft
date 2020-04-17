/* tslint:disable */
// import gorilla = require('gorilla/gorilla');
// import gorillaTaskBuilder = require('gorilla/gorillaTaskBuilder')
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
  const $INFOSCENE = $('#info-scene')
  const $NEWPHASESCENE = $('#new-phase-scene')
  const $MODAL = $('#modal')
  const maxBlock = 6 // should be 10
  const noTrialsToAvg = 5 // this is the number of trials needed in Capacity _phase to move on to the next difficulty level
  const maxTrials = 10 // maximum number of trials to present in the experimental conditions
  let _expPhases = [1, 2, 3, 4]
  let _colorNames = ['orange', 'green', 'blue', 'red']
  _colorNames = shuffle(_colorNames)
  let _taskType = 'Capacity'
  let _previousTaskType = null
  let _currentScene = null
  let _taskID = 'Block #2'
  let $EQUATIONDISPLAY = $('#equation-display')
  $EQUATIONDISPLAY.css('background-color', 'black') // this is default for capacity phase
  let _taskName = null
  let _blockName = null

  _expPhases = shuffle(_expPhases)
  const data = [
    [1, 1],
    [0.8, 2],
    [0.8, 3],
    [0.6, 4],
    [0.4, 5],
    [0.6, 6],
    [0.2, 7],
    [0.2, 8],
    [0, 9],
  ]
  let _OfferChoicePick = []
  let _fitresult = regression.polynomial(data, { order: 3 })
  let _easyTaskDifficulty = Math.round(_fitresult.predict(0.75)[1])
  let _intermediateTaskDifficulty = Math.round(_fitresult.predict(0.5)[1])
  let _difficultTaskDifficulty = Math.round(_fitresult.predict(0.2)[1])
  console.log(_easyTaskDifficulty, _intermediateTaskDifficulty, _difficultTaskDifficulty)
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

  var _my_data

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  function transition(sceneIndex) {
    let time = 2000 + 1000 * Math.random()
    _currentScene = $SCENES.eq(sceneIndex)
    _currentScene.show()
    switch (sceneIndex) {
      case 0:
        if (_phase > 1 && _trialcounter === 0) {
          // console.log('_phase > 1 && _trialcounter === 1')
          time = 4000 + 1000 * Math.random()
          setFixationIcon(_blockName)
          setTimeout(() => {
            setFixationIcon('+')
          }, 1999)
        } else if (_phase > 1 && _trialcounter > 0) {
          //  console.log('_phase > 1 && _trialcounter > 1')
          time = 500 + 18000 - _RT
          setFixationIcon('+')
        }
        _trialcounter = _trialcounter + 1

        break
      case 1:
        $('#equation-display').text(_currentEquation)
        time = 18000
        setTimeout(function () {
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
        _previousLevel = _currentLevel
        _previousTaskType = _taskType
        if (_trialcounter % noTrialsToAvg === 0 && _phase === 1) {
          // below increases the difficulty of the task every 8 trials
          $INFOSCENE.hide()
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
        // if it's beyond the Capacity phase and the maximum number of experimental trials are reached
        if (_trialcounter === maxTrials && _phase > 1) {
          // start the offer and inventory epoch and increment the phase
          // CHECK THIS
          if (_phase === maxBlock) {
            /// !!! here we need to end the experiment and add another Modal that reports the ExtraMoney
            // !!! selected level might not be correct
            $('#scenes').hide()
            $('#exit-scene').show()
            //  gorillaTaskBuilder.forceAdvance()
            DisplayFinish() // I don't like this.
          } else {
            setupQuestionaire()
            _currentLevel = determinePhaseType()
          }
        }

        break
    }

    if (sceneIndex !== 3) {
      // hide the current scene once the deadline passes
      _clock = setTimeout(function () {
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
    _taskID = _taskName + ' questions' //'Block # ' + _phase //_difficultyLetter[phaseType - 1]
    _blockName = 'Block # ' + _phase
    if (!_$SESSIONMODEL.phases[index]) {
      // _$SESSIONMODEL.phases[_phase - 1]
      _$SESSIONMODEL.phases[index] = {
        responses: [],
        tasklevels: [],
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
      _taskType = 'Simple'
      $EQUATIONDISPLAY.css('background-color', _colorNames[0])
      _taskName = _colorNames[0]
    } else if (phaseType === 2) {
      _currentLevel = _easyTaskDifficulty
      _taskType = 'Easy'
      $EQUATIONDISPLAY.css('background-color', _colorNames[1])
      _taskName = _colorNames[1]
    } else if (phaseType === 3) {
      _currentLevel = _intermediateTaskDifficulty
      _taskType = 'Intermediate'
      $EQUATIONDISPLAY.css('background-color', _colorNames[2])
      _taskName = _colorNames[2]
    } else if (phaseType === 4) {
      _currentLevel = _difficultTaskDifficulty
      _taskType = 'Difficult'
      $EQUATIONDISPLAY.css('background-color', _colorNames[3])
      _taskName = _colorNames[3]
    }
    console.log(
      'ExpPhases: ',
      _expPhases,
      'PHASE_VAL: ',
      _phase,
      'PHASE_TYPE: ',
      phaseType,
      'CURRENT_LEVEL: ',
      _currentLevel,
    )
    return _currentLevel
  }

  function hasReachedCapacity() {
    let capacityReached = false
    if (_trialcounter % noTrialsToAvg === 0) {
      _currentLevel = _currentLevel + 1
      let sum = 0
      _accCounter.forEach((v, i) => {
        sum += v
      })
      const avg = sum / _accCounter.length
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
    _fitresult = regression.polynomial(_avgCounter, { order: 3 })
    // insert -> if not a number, pick the simplest values
    _easyTaskDifficulty = Math.round(_fitresult.predict(0.75)[1]) // add Math.round to this !!!
    _intermediateTaskDifficulty = Math.round(_fitresult.predict(0.5)[1])
    _difficultTaskDifficulty = Math.round(_fitresult.predict(0.2)[1])
    if (isNaN(_easyTaskDifficulty) === true) {
      _easyTaskDifficulty = 2
      _intermediateTaskDifficulty = 4
      _difficultTaskDifficulty = 6
    }

    //
    _tasklevels.push(
      Math.round(_easyTaskDifficulty[1]),
      Math.round(_intermediateTaskDifficulty[1]),
      Math.round(_difficultTaskDifficulty[1]),
    )
    _currentLevel = determinePhaseType()
  }

  function fillArray(value, len) {
    //var arr = []
    for (var i = 0; i < len; i++) {
      _OfferChoicePick.push(value)
    }
    return _OfferChoicePick
  }

  function saveInventory(questions) {
    // TODO: Keep track of phase increment better!
    _$SESSIONMODEL.phases[_phase - 1].inventory = questions
    // put it here .remove

    // SAVE: localStorage for dev env
    localStorage.setItem('SessionData', JSON.stringify(_$SESSIONMODEL))
    let inArr = _$SESSIONMODEL.phases[_phase - 1].inventory

    _OfferChoicePick = fillArray(_expPhases[_phase - 2], Math.round(((3.1 - inArr[0].value) / 3.1) * 10))

    //_OfferChoicePick.push([Math.round(((3.1 - inArr[0].value) / 3.1) * 10), _expPhases[_phase - 2]])
    console.log(_OfferChoicePick)
    inArr.forEach((q) => {
      gorilla.metric({
        questionName: q.name,
        questions: q.value,
        currentLevel: _previousLevel,
        phase: _phase,
        taskType: _previousTaskType,
      })
    })
    inArr = []

    // SAVE: Gorilla API

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

  function saveResponse() {
    // performance during arithmetic summations
    _RT = performance.now() - _equationStart // Date.now() - _equationStart
    _responseData.level = _currentLevel
    _responseData.trial = _trialcounter
    _responseData.RT = _RT
    _responseData.equation = _currentEquation
    _$SESSIONMODEL.phases[_phase - 1].responses.push(_responseData)
    _$SESSIONMODEL.phases[_phase - 1].tasklevels.push(_tasklevels)
    let dataToSave = _$SESSIONMODEL.phases[_phase - 1].responses
    gorilla.metric({
      RT: _RT,
      currentLevel: _currentLevel,
      trial: _trialcounter,
      equation: _currentEquation,
      accuracy: _responseData.accuracy,
      answer: _responseData.answer,
      phase: _phase,
      taskType: _taskType,
    })

    _responseData = {
      trial: _trialcounter,
      level: _currentLevel,
      answer: '',
      accuracy: 0,
      RT: 0,
      equation: '',
    }

    // SAVE: Local dev
    localStorage.setItem('SessionData', JSON.stringify(_$SESSIONMODEL))
    // SAVE: Gorilla API
  }

  function determineAccuracy() {
    // below keep track of response time since the equation presentation

    let accuracy = _$ACCURACY.tooSlow
    _responseData.answer = $INPUT_ANSWER.val()
    let outcome = eval(_currentEquation)

    if (outcome === parseInt(_responseData.answer)) {
      accuracy = _$ACCURACY.correct
    } else if (outcome !== parseInt(_responseData.answer) && _responseData.answer.trim() !== '') {
      accuracy = _$ACCURACY.incorrect
    }

    // if (_responseData.answer.trim() === '') {
    //   accuracy = _$ACCURACY.tooSlow
    // }

    _responseData.accuracy = accuracy.value

    _accCounter.push(_responseData.accuracy)

    saveResponse()

    $INPUT_ANSWER.val('')
    $ACCURACY_DISPLAY.text(accuracy.label)

    Object.keys(_$ACCURACY).forEach((o) => {
      $ACCURACY_DISPLAY.removeClass(_$ACCURACY[o].class)
    })

    $ACCURACY_DISPLAY.addClass(accuracy.class)

    clearTimeout(_clock)
    // savedata()
  }

  function setFixationIcon(letter = '+') {
    $('#fixation').find('.icon').text(letter)
  }

  function setupQuestionaire() {
    let currentEq = 0
    const form = $('#questionaire-form')
    _$CONFIG.inventoryQuestions.forEach((q, i) => {
      if (i < 9) {
        inventoryQuestionText()
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
      } else if (i === 9) {
        $ACCURACY_DISPLAY.hide()
        $NEWPHASESCENE.hide()
        $INFOSCENE.hide()
        if (_phase === 2) {
          useModal(_$INSTRUCTIONS.offer1)
        } else if (_phase > 2) {
          useModal(_$INSTRUCTIONS.offerRest)
        }
        $INFOSCENE.show()
        // !!! start here the output doesn't pop up
        form.prepend(`
        <div class="questionaire-layout">
          <label for="qf-${i}"><h1>${q}</h1></label>
          <br />
          <div class="questionaire-input">
            <span class="min-text">0.1 €</span>
            <input type="range" class="slider" id="qf-${i}" name="qf-${i}" min="0.1" max="3" step="0.1">
            <span class="max-text">3 €</span>
            <div class="slider-value"></div>
          </div>
        </div>
        </div>
      `)
        // this below code shows the selected offer amount online
        $('.slider').on('input', (e) => {
          console.log($('.slider-value'))
          $('.slider-value').html($(e.target).val() + ' €')
        })
      }
    })

    const ql = $('.questionaire-layout')
    const btn = $('#questionaire-next-button')
    const submitBtn = $('#questionaire-submit-button')

    ql.hide()
    ql.eq(currentEq).show()
    submitBtn.hide()

    btn.show().click((e) => {
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

        if (_phase === maxBlock - 1) {
          _expPhases.push(_OfferChoicePick[Math.floor(Math.random() * _OfferChoicePick.length)]) // randomly select one of the tasks
          _currentLevel = determinePhaseType()
          console.log('ExpPhases:', _expPhases)
        }
      }
    })
  }

  function useModal(text) {
    $MODAL.find('#modal-content-text').html(text)
    $MODAL.fadeIn()
  }

  function newPhaseSceneText() {
    $NEWPHASESCENE
      .find('.instructions')
      .text('You completed Block #' + (_phase - 1) + '.' + ' Click START to start Block #' + _phase)
  }

  function inventoryQuestionText() {
    $INFOSCENE
      .find('.infoQuest-id')
      .text('Please state your agreement on the statements below regarding your experience during the ' + _taskID)
  }

  function DisplayFinish() {
    gorilla.finish()
  }

  // gorilla.refreshLayout()
  startPhase()
  $('#exit-scene').hide()

  // transition starts when the button is pressed (welcome screen)
  $('.start-button').on('click keypress', (e) => {
    e.preventDefault()
    $('#welcome-screen').hide()
    transition(0)
  })

  // transition starts when the button is pressed (welcome screen)
  $('.phase-continue-button').on('click keypress', (e) => {
    e.preventDefault()
    $NEWPHASESCENE.hide()
    transition(0)
  })

  // show answer accuracy
  $EQUATION_FORM.submit((e) => {
    e.preventDefault()
    if ($INPUT_ANSWER.val() === '') {
      return
    }
    timer(2)
  })

  // show answer accuracy
  $('#questionaire-submit-button').on('click keypress', (e) => {
    e.preventDefault()
    saveInventory($('.slider').serializeArray())
    $INFOSCENE.hide()
    $('#questionaire-form').find('.questionaire-layout').remove()
    startPhase()
    newPhaseSceneText() // the function that pastes the phase number in the info text
    $NEWPHASESCENE.show()
  })

  $('#welcome-screen').find('.message').html(_$INSTRUCTIONS.welcome)

  // Close modal
  window.onclick = (e) => {
    if ($MODAL.is(e.target) || $(e.target).hasClass('modal-close')) {
      $MODAL.hide()
    }
  }
}

// In Gorilla: main.js.ts line 3: Module '"optEft.js"' has no default export.
// export default optEft
