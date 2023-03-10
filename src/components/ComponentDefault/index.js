import { $, $$ } from "../../utils/snippets";
import "./_style.scss";


async function ComponentDefault() {
  return /*html*/ `
      <div id="component-default">
        <h1>Component X</h1>
      </div>
    `
}

async function ComponentDefaultJS() {
  // code here ...
}

export { ComponentDefault, ComponentDefaultJS };