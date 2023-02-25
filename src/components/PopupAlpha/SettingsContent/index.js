// import { $ } from "../../utils/snippets";
import SelectOption from "../../SelectOption";

async function SettingsContent() {
    const MainContent = /*html*/ `
        ${await SelectOption("Language", ["EN", "PT"])}
        ${await SelectOption("Difficulty", ["MEDIUM", "HARD", "EXPERT"])}
    `

    const FooterContent = /*html*/ `
        <button>New Game</button>
        <button>Save</button>
    `

    return [MainContent, FooterContent]
}

export default SettingsContent;