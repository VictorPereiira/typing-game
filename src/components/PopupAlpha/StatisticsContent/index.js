// import { $ } from "../../utils/snippets";

async function StatisticsContent() {
    const MainContent = /*html*/ `
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
    `

    const FooterContent = /*html*/ `
       <button>Github</button>
       <button>Linkedin</button>
    `

    return [MainContent, FooterContent]
}

export default StatisticsContent;

