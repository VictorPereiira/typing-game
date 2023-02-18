import Home from "./page/Home/index.js";
import { $ } from "./utils/snippets.js";

async function App() {
    $("body").innerHTML = await Home();
}

export default App;