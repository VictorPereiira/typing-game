// import { $ } from "../../utils/snippets";
import SimpleTable from "../SimpleTable";
import "./_style.scss";

async function CardGameOver() {
    return /*html*/ `
        <div id="card-game-over">
            <header>
                <h3 class="card-game-over__title">Game Over</h3>
            </header>
            <main class="main-content">
                <section  class="card-game-over__statistics-container">
                    ${await SimpleTable(["Time Played", "00:00:09", "time-played"])}
                    ${await SimpleTable(["Error Rate", "...", "error-rate"])}
                    ${await SimpleTable(["Difficulty", "Medium", "difficulty"])}
                    ${await SimpleTable(["Typed Words", "0", "typed-words"])}
                </section>
                <section class="card-game-over__point-container">
                    <p class="card-game-over__point-title">Points:</p>
                    <p class="card-game-over__point-value">0</p>
                </section>
            </main>
            <footer>
                <button>MAIN MENU</button>
                <button>PLAY AGAIN</button>
            </footer>
        </div>
    `
}

export default CardGameOver;