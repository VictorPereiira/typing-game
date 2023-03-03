// import { Menu } from "./components/Menu/index.js";
// import CardDefault from "./components/PopupAlpha/CardDefault/index.js";
// import CardGameOver from "./components/PopupBetha/index.js";
import Home from "./page/Home/index.js";
import { $ } from "./utils/snippets.js";

async function App() {
    $("body").insertAdjacentHTML('beforeend', await Home())
    // $("body").innerHTML = await CardGameOver();
    // $("body").innerHTML += await CardDefault("settings");
    // $("body").innerHTML += await CardDefault("statistics");

}

export default App;