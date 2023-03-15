import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

import get_data from "../../database/get_data";
import timeAdd from "../../config/timeAdd"
import { update_point } from "../Point";
import { WordJS } from "../Word";

async function Input() {
  return /*html*/ `
      <div id="input">
        <input type="text" placeholder="Write the word here!!!" disabled>
      </div>
    `
}

async function InputJS() {
  const $input = $("#input input")
  $input.disabled = false
  $input.focus()
  $input.addEventListener('input', async (e) => {
    const insertedText = (e.target.value).toLowerCase()
    const { difficulty } = await get_data()
    let randomWord = $("#word h2").innerText

    if (insertedText === randomWord) {
      await update_point()
      await WordJS()
      e.target.value = ''
      e.target.placeholder = ''

      const time = $("#time .time-count").innerText.slice(0, -1)
      const time_now = Number(time) + Number(timeAdd[difficulty])
      $("#time .time-count").innerText = `${time_now}s`
    }
  })
}

export { Input, InputJS };