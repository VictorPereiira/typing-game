const $ = (value) => document.querySelector(value)
const $$ = (value) => document.querySelectorAll(value)
const innerHTML = (param) => $(param).innerHTML

// const addClass = (text) => btn.classList.add(`check_${text}`)
// const removeClass = () => btn.classList.remove(btn.classList.value)

export {
    $, $$, innerHTML
}