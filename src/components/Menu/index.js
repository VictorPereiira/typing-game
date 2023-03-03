import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

async function Menu() {
    return /*html*/ `
        <div id="menu">
            <button class="menu__button--arrUP" value="statistics">Statistics</button>
            <button class="menu__button--arrDOWN" value="settings">Settings</button>
        </div>
    `
}

async function MenuJS() {
    // Menu
    $("#home .header__button").addEventListener("click", async () => {
        if (!$("#menu")) {
            $(".header__actions").insertAdjacentHTML('beforeend', await Menu())
            await options__click_fun()
        } else {
            $("#menu").remove()
        }
    })

    // Options
    async function options__click_fun() {
        $$("#menu button").forEach(btn => {
            btn.addEventListener("click", async () => {
                $("#menu").remove()
                $("#home").classList.add('blur');

                const fun = {
                    "statistics": async () => {
                        document.body.insertAdjacentHTML('beforeend', await CardDefault("statistics"))
                        await statistics()
                    },
                    "settings": async () => {
                        document.body.insertAdjacentHTML('beforeend', await CardDefault("settings"))
                        await settings()
                    }
                }

                await fun[btn.value]()
            })
        });
    }
}

export { Menu, MenuJS };