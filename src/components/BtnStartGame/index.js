import { $ } from "../../utils/snippets"
import "./_style.scss"

import { TimeJS, unpause_time } from "../Time"

async function BtnStartGame() {
    return /*html*/ `
        <button id="btn-start-game">Start Game</button>
    `
}

async function BtnStartGameJS() {
    $("#btn-start-game").addEventListener("click", async () => {
        if ($("#menu")) $("#menu").remove()

        $("#btn-start-game").remove()
        await TimeJS()
        await unpause_time()
    })
}

export { BtnStartGame, BtnStartGameJS }