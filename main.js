import App from "./src/App.js";
import init_db from "./src/database/start_data.js";
import activeButtonsFun from "./src/function/index.js";

(async () => {
    await init_db();
    await App();
    await activeButtonsFun();
})()