import { $ } from "../../utils/snippets"
import "./_style.scss"

import get_data from "../../database/get_data"
import speedTime from "../../config/speedTime"

async function Time() {
    return /*html*/ `
        <div id="time">
            <p class="time-count">10s</p>
            <span class="time-icon"></span>
        </div>  
    `
}

async function TimeJS() {
    const { difficulty } = await get_data()
    const _speedTime = speedTime[difficulty]
    let time_interval = setInterval(updateClock, +_speedTime)

    async function updateClock() {
        // if (pause) return
        const time = Number($("#time .time-count").innerText.slice(0, -1))
        console.log(time);
        if (time > 0) {
            $("#time .time-count").innerText = `${time - 1}s`
        } else {
            clearInterval(time_interval)
            // await gameOver()
        }
    }
}

export { Time, TimeJS }