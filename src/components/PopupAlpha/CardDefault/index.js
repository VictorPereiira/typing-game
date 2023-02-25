// import { $ } from "../../utils/snippets";
import "./_style.scss";
import SettingsContent from "../SettingsContent";
import StatisticsContent from "../StatisticsContent";

async function CardDefault(content) {
    const title = content[0].toUpperCase() + content.slice(1)
    const [MainContent, FooterContent] =
        content === "settings" ? await SettingsContent() : await StatisticsContent()

    return /*html*/ `
        <div id="card-default">
            <header>
                <h3 class="card-default__title">${title}</h3>
                <button>x</button>
            </header>
            <main class="main-content">
                ${MainContent}
            </main>
            <footer>
                ${FooterContent}
            </footer>
        </div>
    `
}

export default CardDefault;