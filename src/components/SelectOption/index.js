// import { $ } from "../../utils/snippets";
import get_data from "../../database/get_data";
import "./_style.scss";

async function SelectOption(label, options) {
    let OptionValues = ''
    const data = await get_data()
    options.forEach(value => {
        let text = value[0].toUpperCase() + value.slice(1)
        if (value === data[label.toLowerCase()]) {
            OptionValues += /*html*/ `<option value="${value}" selected>${text}</option>`
        } else {
            OptionValues += /*html*/ `<option value="${value}">${text}</option>`
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