// import { $ } from "../../utils/snippets";
import get_data from "../../database/get_data";
import "./_style.scss";

async function SelectOption(label, options) {
    let OptionValues = ''
    const data = await get_data()
    options.forEach(value => {
        let text = value.toLowerCase()
        if (text === data[label.toLowerCase()]) {
            OptionValues += /*html*/ `<option value="${value}" selected>${value}</option>`
        } else {
            OptionValues += /*html*/ `<option value="${value}">${value}</option>`
        }
    });

    return /*html*/ `
        <div id="select-option">
            <section>
                <p>${label}</p>
            </section>
            <section>
                <select class="select-option__${label}">
                    ${OptionValues}
                </select>
            </section>
        </div>
    `
}

export default SelectOption;