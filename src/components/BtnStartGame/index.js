import { $ } from "../../utils/snippets"
import "./_style.scss"

import { start_clock, TimeJS, unpause_time } from "../Time"
import { InputJS } from "../Input"

async function BtnStartGame() {
    return /*html*/ `
        <button id="btn-start-game">Start Game</button>
    `
}

async function BtnStartGameJS() {
    $("#btn-start-game").addEventListener("click", async () => {
        if ($("#menu")) $("#menu").remove()
        $("#btn-start-game").remove()

        await InputJS()
        await TimeJS()
        await unpause_time()
        await start_clock()
    })
}

export { BtnStartGame, BtnStartGameJS }