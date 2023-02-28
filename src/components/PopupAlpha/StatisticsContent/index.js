// import { $ } from "../../utils/snippets";
import get_data from "../../../database/get_data";
import SimpleTable from "../../SimpleTable";
import "./_style.scss"

async function StatisticsContent() {
    const { gameTime, rounds, hitAverage } = await get_data()

    const MainContent = /*html*/ `
        <div id="statistics-main-content">
            ${await SimpleTable(["Game Time", gameTime, , "game-time"])}
            ${await SimpleTable(["Rounds", rounds, "rounds"])}
            ${await SimpleTable(["Hit Average", hitAverage, "hit-average"])}
        </div>
    `

    const FooterContent = /*html*/ `
        <div id="statistics-footer-content">
            <button class="statistics__btn-github" value="github"></button>
            <button class="statistics__btn-linkedin" value="linkedin"></button>
            <button class="statistics__btn-instagram" value="instagram"></button>
       </div>
    `

    return [MainContent, FooterContent]
}

export default StatisticsContent;

