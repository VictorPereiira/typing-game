import { $, $$ } from "../../utils/snippets";
import "./_style.scss";

import { Settings, SettingsJS } from "../Settings";
import { Statistics, StatisticsJS } from "../Statistics";
import { pause_time, unpause_time } from "../Time";

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
            await pause_time()
            $(".header__actions").insertAdjacentHTML('beforeend', await Menu())
            await options__click_fun()
        } else {
            await unpause_time()
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
                        document.body.insertAdjacentHTML('beforeend', await Statistics())
                        await StatisticsJS()
                    },
                    "settings": async () => {
                        document.body.insertAdjacentHTML('beforeend', await Settings())
                        await SettingsJS()
                    }
                }

                await fun[btn.value]()
            })
        });
    }
}

export { Menu, MenuJS };