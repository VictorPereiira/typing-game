// import { $ } from "../../utils/snippets";
import SimpleTable from "../../SimpleTable";
import "./_style.scss"

async function StatisticsContent() {
    const MainContent = /*html*/ `
        <div id="statistics-main-content">
            ${await SimpleTable(["Game Time", "00:00:00", "game-time"])}
            ${await SimpleTable(["Rounds", "0", "rounds"])}
            ${await SimpleTable(["Hit Average", "...", "hit-average"])}
        </div>
    `

    const FooterContent = /*html*/ `
        <div id="statistics-footer-content">
            <button class="statistics__btn-github"></button>
            <button class="statistics__btn-linkedin"></button>
            <button class="statistics__btn-instagran"></button>
       </div>
    `

    return [MainContent, FooterContent]
}

export default StatisticsContent;

