import $ from 'jquery'

import './home.scss'

import { optEft } from '../../../js/experiment'

window.$ = $
// window.jQuery = jQuery

console.log($, optEft)
$(document).ready(() => {
  optEft()
})
