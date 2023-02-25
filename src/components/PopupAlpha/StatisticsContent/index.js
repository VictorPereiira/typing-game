// import { $ } from "../../utils/snippets";
import "./_style.scss"

async function StatisticsContent() {
    const MainContent = /*html*/ `
        <div id="statistics-main-content">
        <div>
            <p>Game Time:</p>
            <p>00:05:03</p>
        </div>
        <div>
            <p>Rounds:</p>
            <p>18</p>
        </div>
        <div>
            <p>Hit Average:</p>
            <p>...</p>
        </div>
        </div>
    `

    const FooterContent = /*html*/ `
        <div id="statistics-footer-content">
            <button>Github</button>
            <button>Linkedin</button>
            <button>Instagram</button>
       </div>
    `

    return [MainContent, FooterContent]
}

export default StatisticsContent;

