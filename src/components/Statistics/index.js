// import { $ } from "../../utils/snippets";
import get_data from "../../database/get_data";
import { $$ } from "../../utils/snippets";
import SimpleTable from "../SimpleTable";
import "./_style.scss"

async function Statistics() {
    const { gameTime, rounds, hitAverage } = await get_data()

    return /*html*/ `
        <div id="statistics">
            <header>
                <h3 class="title">Statistics</h3>
                <button class="button-close">x</button>
            </header>
            <main id="statistics-main-content">
                ${await SimpleTable(["Game Time", gameTime, , "game-time"])}
                ${await SimpleTable(["Rounds", rounds, "rounds"])}
                ${await SimpleTable(["Hit Average", hitAverage, "hit-average"])}
            </main>
            <footer id="statistics-footer-content">
                <button class="statistics__btn-github" value="github"></button>
                <button class="statistics__btn-linkedin" value="linkedin"></button>
                <button class="statistics__btn-instagram" value="instagram"></button>
            </footer>
        </div>
    `
}

async function StatisticsJS() {
    $$("#statistics button").forEach(btn => {
        btn.addEventListener("click", () => {
            const box = {
                github: () => open("https://github.com/VictorPereiira", "_black"),
                linkedin: () => open("https://www.linkedin.com/in/victorpereiira/", "_black"),
                instagram: () => open("https://www.instagram.com/_victorpereiira/", "_black"),
            }

            box[btn.value]()
        })
    })
}

export { Statistics, StatisticsJS };

