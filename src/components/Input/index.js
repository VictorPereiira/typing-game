import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

import get_data from "../../database/get_data";
import timeAdd from "../../config/timeAdd"
import { update_point } from "../Point";

async function Input() {
  return /*html*/ `
      <div id="input">
        <input type="text" placeholder="Write the word here!!!" disabled>
      </div>
    `
}

async function InputJS() {
  let typedWords = 0
  $("#input input").disabled = false
  $("#input").addEventListener('input', async (e) => {
    const insertedText = (e.target.value).toLowerCase()
    const { difficulty } = await get_data()
    let randomWord = "s"

    if (insertedText === randomWord) {
      // turn++
      await update_point()
      // checkLengthBoxRadom()
      // wordToDOM()
      // $("#input").placeholder = ' '
      e.target.value = ''
      const time = $("#time .time-count").innerText.slice(0, -1)
      const time_now = Number(time) + Number(timeAdd[difficulty])
      $("#time .time-count").innerText = `${time_now}s`
    }
  })

  // function checkLengthBoxRadom() {
  //   if (boxRandom.length === words[lang].length) boxRandom.splice(0, Number.MAX_VALUE)
  // }


  // function wordToDOM() {
  //   overall = words[lang].length

  //   if (turn < 1) {
  //     randomNumber = Math.floor(Math.random() * overall)
  //   } else {
  //     while (boxRandom.indexOf(randomNumber) > -1) { // exists randomNumber repeats
  //       randomNumber = Math.floor(Math.random() * overall)
  //     }
  //   }

  //   randomWord = words[lang][randomNumber]
  //   boxRandom.push(randomNumber)
  //   word.innerHTML = randomWord
  // }

}

export { Input, InputJS };