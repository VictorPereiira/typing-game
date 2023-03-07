import { unpause_time } from "../../components/Time"
import { $ } from "../../utils/snippets"

async function CardDefault(title = "Undefined") {
    return /*html*/ `
        <header>
            <h3 class="card-default__title">${title}</h3>
            <button class="card-default__button-close">x</button>
        </header>
    `
}

async function CardDefaultJS() {
    $(".card-default__button-close").addEventListener("click", async () => {
        $(".card-default").remove()
        $("#home").classList.remove("blur")
        await unpause_time()
    })
}

export { CardDefault, CardDefaultJS }