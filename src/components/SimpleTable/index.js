// import { $ } from "../../utils/snippets";
import "./_style.scss";

async function SimpleTable(data) {
    const [key, value, clax] = data
    return /*html*/ `
        <div class="simple-table">
            <p>${key}</p>
            <p class="${clax}">${value}</p>
        </div>
    `
}

export default SimpleTable;