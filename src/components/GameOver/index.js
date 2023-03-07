import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

import init_db from "../../database/start_data";
import get_data from "../../database/get_data";

import App from "../../App";
import SimpleTable from "../SimpleTable";

import activeButtonsFun from "../../function";
import { format_seconds_to_time, format_time_in_seconds } from "../Time";

async function GameOver() {
    const { difficulty, timeRoundPlayed } = await get_data()

    return /*html*/ `
        <div id="game-over">
            <header>
                <h3 class="game-over__title">Game Over</h3>
            </header>
            <main class="main-content">
                <section  class="game-over__statistics-container">
                    ${await SimpleTable(["Time Played", timeRoundPlayed, "time-played"])}
                    ${await SimpleTable(["Error Rate", "...", "error-rate"])}
                    ${await SimpleTable(["Difficulty", difficulty, "difficulty"])}
                    ${await SimpleTable(["Typed Words", "0", "typed-words"])}
                </section>
                <section class="game-over__point-container">
                    <p class="game-over__point-title">Points:</p>
                    <p class="game-over__point-value">0</p>
                </section>
            </main>
            <footer class="game-over_footer">
                <button value="home">HOME</button>
                <button value="play-again">PLAY AGAIN</button>
            </footer>
        </div>
    `
}

async function GameOverJS() {
    $("#home").classList.add('blur');

    $$(".game-over_footer button").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const data = await get_data()
            const gameTime = await format_time_in_seconds(data.gameTime)
            const timeRoundPlayed = await format_time_in_seconds(data.timeRoundPlayed)
            data.gameTime = await format_seconds_to_time(gameTime + timeRoundPlayed)
            data.timeRoundPlayed = "00:00:00"
            data.rounds = +data.rounds + 1
            data.gameOver = false
            localStorage.setItem("typingGame", JSON.stringify(data))

            if (btn.value === "home") {
                location.reload();
            } {
                $("body").innerHTML = ""
                await init_db();
                await App();
                await activeButtonsFun();
                $("#btn-start-game").click()
            }

        })
    });
}

export { GameOver, GameOverJS };