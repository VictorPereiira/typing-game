const $ = (value) => document.querySelector(value)
const innerHTML = (param) => $(param).innerHTML

export {
    $, innerHTML
}