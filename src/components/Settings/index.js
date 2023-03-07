import { $, $$ } from "../../utils/snippets";
import get_data from "../../database/get_data";
import "./_style.scss"

import { CardDefault, CardDefaultJS } from "../../wapper/CardDefault";
import SelectOption from "../SelectOption"


async function Settings() {
    return /*html*/ `
        <div id="settings" class="card-default">
            ${await CardDefault("Settings")}
            <main id="settings-main-content">
                ${await SelectOption("Language", ["EN", "PT"])}
                ${await SelectOption("Difficulty", ["MEDIUM", "HARD", "EXPERT"])}
            </main>
            <footer id="settings-footer-content">
                <button value="newgame">New Game</button>
                <button value="save">Save</button>
            </footer>
        </div>
    `
}

async function SettingsJS() {
    await CardDefaultJS()
    $$("#settings-footer-content button").forEach(async (btn) => {
        btn.addEventListener("click", async () => {
            const data = await get_data()
            $$("#settings-main-content #select-option select").forEach((select, idx) => {
                let value = (select.value).toLowerCase()
                idx === 0 ? data.language = value : data.difficulty = value;
            })

            localStorage.setItem("typingGame", JSON.stringify(data))
            $(".card-default").remove()
            $("#home").classList.remove("blur")
        })
    })
}

export { Settings, SettingsJS }