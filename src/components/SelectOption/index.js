// import { $ } from "../../utils/snippets";
import "./_style.scss";

async function SelectOption(label, options) {
    let OptionValues = ''
    options.forEach(value => {
        let text = value[0].toUpperCase() + value.slice(1)
        OptionValues += /*html*/ `<option value="${value}">${text}</option>`
    });

    return /*html*/ `
        <div id="select-option">
            <section>
                <p>${label}</p>
            </section>
            <section>
                <select>
                    ${OptionValues}
                </select>
            </section>
        </div>
    `
}

export default SelectOption;