import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

import get_data from "../../database/get_data";
import SimpleTable from "../SimpleTable";

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

    $$(".game-over_footer button").forEach(btn => {
        const { value } = btn
    });
}

export { GameOver, GameOverJS };