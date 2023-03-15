import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

import temp_randow_word from "../../database/temp_random_word"
import words from "../../database/words"

import defaultValues from "../../config/defaultValues";
const { start_word } = defaultValues

async function Word() {
  return /*html*/ `
      <div id="word">
        <h2>${start_word}</h2>
      </div>
    `
}

async function WordJS() {
  let randomNumber = 0
  overall = words[0].length
  const point_count = +$(".point__count").innerText

  if (point_count === 0) {
    randomNumber = Math.floor(Math.random() * overall)
  } else {
    while (temp_randow_word.indexOf(randomNumber) > -1) { // exists randomNumber repeats
      randomNumber = Math.floor(Math.random() * overall)
    }
  }

  temp_randow_word.push(randomNumber)
  word.innerHTML = words[0][randomNumber]
}

export { Word, WordJS };