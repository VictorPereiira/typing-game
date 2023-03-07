import { $ } from "../../utils/snippets"
import "./_style.scss"

import get_data from "../../database/get_data"
import speedTime from "../../config/speedTime"
import { GameOver, GameOverJS } from "../GameOver"

import defaultValues from "../../config/defaultValues"
const { time_count, end_time } = defaultValues

async function Time() {
    return /*html*/ `
        <div id="time">
            <p class="time-count">${time_count}s</p>
            <span class="time-icon"></span>
        </div>  
    `
}

async function TimeJS() {
    const { difficulty } = await get_data()
    const _speedTime = speedTime[difficulty]
    let time_interval = setInterval(updateClock, +_speedTime)

    async function updateClock() {
        const { pause } = await get_data()
        if (pause) return
        const time = Number($("#time .time-count").innerText.slice(0, -1))
        if (time > +end_time) {
            $("#time .time-count").innerText = `${time - 1}s`
        } else {
            clearInterval(time_interval)
            const data = await get_data()
            data.gameOver = true
            localStorage.setItem("typingGame", JSON.stringify(data))
        }
    }
}

async function unpause_time() {
    const data = await get_data()
    data.pause = false
    localStorage.setItem("typingGame", JSON.stringify(data))
}

async function pause_time() {
    const data = await get_data()
    data.pause = true
    localStorage.setItem("typingGame", JSON.stringify(data))
}

async function format_seconds_to_time(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsFinal = remainingSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSecondsFinal).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

async function start_clock() {
    let count = 0
    let time = setInterval(async () => {
        const data = await get_data()
        if (data.pause) return

        if (!data.gameOver) {
            count++
        } else {
            clearInterval(time)
            data.timeRoundPlayed = await format_seconds_to_time(count)
            localStorage.setItem("typingGame", JSON.stringify(data))

            $("body").insertAdjacentHTML('beforeend', await GameOver())
            await GameOverJS()
        }
    }, 1000)
}



export { Time, TimeJS, unpause_time, pause_time, start_clock, format_seconds_to_time }