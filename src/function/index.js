import { $, $$ } from "../utils/snippets";
import Menu from "../components/Menu";
import CardDefault from "../components/PopupAlpha/CardDefault";
import CardGameOver from "../components/PopupBetha";

async function activeButtonsFun() {
    // const addClass = (text) => btn.classList.add(`check_${text}`)
    // const removeClass = () => btn.classList.remove(btn.classList.value)

    // Menu
    $("#home .header__button").addEventListener("click", async () => {
        if (!$("#menu")) {
            $(".header__actions").insertAdjacentHTML('beforeend', await Menu())
            await menuClickFun()
        } else {
            $("#menu").remove()
        }
    })

    async function menuClickFun() {
        $$("#menu button").forEach(btn => {
            btn.addEventListener("click", async () => {
                $("#menu").remove()
                $("#home").classList.add('blur');

                switch (btn.value) {
                    case "statistics":
                        document.body.insertAdjacentHTML('beforeend', await CardDefault("statistics"))
                        await statistics()
                        break;
                    case "settings":
                        document.body.insertAdjacentHTML('beforeend', await CardDefault("settings"))
                        await closeCardDefault()
                        break;
                }
            })
        });
    }

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

}



export default activeButtonsFun;