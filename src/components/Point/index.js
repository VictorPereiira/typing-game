import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

async function Point() {
  return /*html*/ `
      <div id="point">
        <span class="point__icon"></span>
        <span class="point__count">0</span>
      </div>
    `
}

async function update_point() {
  const $point_count = $(".point__count")
  const last_points = $point_count.innerText
  $point_count.innerText = Number(last_points) + 1
}

export { Point, update_point };