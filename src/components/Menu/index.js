// import { $ } from "../../utils/snippets";
import "./_style.scss";

async function Menu() {
    return /*html*/ `
        <div id="menu">
            <button class="menu__button--arrUP" value="statistics">Statistics</button>
            <button class="menu__button--arrDOWN" value="settings">Settings</button>
        </div>
    `
}

export default Menu;