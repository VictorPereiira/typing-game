// import { $ } from "../../utils/snippets";
import "./_style.scss";
import SelectOption from "../../SelectOption";

async function SettingsContent() {
    const MainContent = /*html*/ `
        <div id="setting-main-content">
            ${await SelectOption("Language", ["EN", "PT"])}
            ${await SelectOption("Difficulty", ["MEDIUM", "HARD", "EXPERT"])}
        </div>
    `

    const FooterContent = /*html*/ `
        <div id="setting-footer-content">
            <button value="newgame">New Game</button>
            <button value="save">Save</button>
        </div>
    `

    return [MainContent, FooterContent]
}

export default SettingsContent;