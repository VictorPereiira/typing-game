const $ = (value) => document.querySelector(value)
const $$ = (value) => document.querySelectorAll(value)
const innerHTML = (param) => $(param).innerHTML

export {
    $, $$, innerHTML
}