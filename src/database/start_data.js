import { unpause_time } from "../components/Time";

async function init_db() {
    const start_values = {
        "gameTime": "00:00:00",
        "rounds": "0",
        "hitAverage": "0%",
        "language": "en",
        "difficulty": "medium",
        "pause": false
    }

    if (!localStorage.getItem("typingGame")) {
        localStorage.setItem("typingGame", JSON.stringify(start_values))
    } else {
        await unpause_time()
        console.log("data updated");
    }
}

export default init_db;