import { $ } from "./utils/snippets.js";
import Home from "./page/Home/index.js";

async function App() {
    $("body").insertAdjacentHTML('beforeend', await Home())
}

export default App;