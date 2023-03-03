import { $, $$ } from "../utils/snippets";
import { Menu, MenuJS } from "../components/Menu";
import CardDefault from "../components/PopupAlpha/CardDefault";
import CardGameOver from "../components/PopupBetha";
import get_data from "../database/get_data";

async function activeButtonsFun() {
    // const addClass = (text) => btn.classList.add(`check_${text}`)
    // const removeClass = () => btn.classList.remove(btn.classList.value)

    // Menu
    await MenuJS()
    async function closeCardDefault() {
        $(".card-default__button-close").addEventListener("click", async () => {
            $("#card-default").remove()
            $("#home").classList.remove("blur")
        })
    }


    // Statistics Popup
    async function statistics() {
        await closeCardDefault()
        $$("#statistics-footer-content button").forEach(btn => {
            btn.addEventListener("click", () => {
                const box = {
                    github: () => open("https://github.com/VictorPereiira", "_black"),
                    linkedin: () => open("https://www.linkedin.com/in/victorpereiira/", "_black"),
                    instagram: () => open("https://www.instagram.com/_victorpereiira/", "_black"),
                }

                box[btn.value]()
            })
        })
    }


    // Settings
    async function settings() {
        await closeCardDefault()
        $$("#setting-footer-content button").forEach(async (btn) => {
            btn.addEventListener("click", setSelectValue)
        })
    }

    async function setSelectValue() {
        const data = await get_data()
        $$("#setting-main-content #select-option select").forEach((select, idx) => {
            if (idx === 0) {
                data.language = select.value
            } else {
                data.difficulty = select.value

                // if (speedTime === 1000)
                // if (speedTime === 600)
                // if (speedTime === 300)
            }
        })

        localStorage.setItem("typingGame", JSON.stringify(data))
        $("#card-default").remove()
        $("#home").classList.remove("blur")
    }


    // Time
    let time_interval = null
    $("#home .main__button").addEventListener("click", async () => {
        $("#menu") ? $("#menu").remove() : true;
        const { speedTime } = await get_data()
        $("#home .main__button").remove()
        time_interval = setInterval(updateClock, +speedTime)
    })

    async function updateClock() {
        // if (pause) return
        const time = Number($(".header__time").innerText.slice(0, -1))
        if (time > 0) {
            $(".header__time").innerText = `${time - 1}s`
        } else {
            clearInterval(time_interval)
            await gameOver()
        }
    }


    async function gameOver() {
        $("#home").classList.add('blur');
        document.body.insertAdjacentHTML('beforeend', await CardGameOver())
    }
}



export default activeButtonsFun;