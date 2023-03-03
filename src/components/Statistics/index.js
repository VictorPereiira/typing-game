import { $$ } from "../../utils/snippets";
import get_data from "../../database/get_data";
import "./_style.scss"
import"../../wapper/CardDefault/_style.scss"

import { CardDefault, CardDefaultJS } from "../../wapper/CardDefault";
import SimpleTable from "../SimpleTable";

async function Statistics() {
    const { gameTime, rounds, hitAverage } = await get_data()

    return /*html*/ `
        <div id="statistics" class="card-default">
            ${await CardDefault("Statistics")}
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
    await CardDefaultJS()
    $$("#statistics-footer-content button").forEach(btn => {
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

