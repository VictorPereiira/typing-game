import { unpause_time } from "../components/Time";
import get_data from "./get_data";

async function init_db() {
    const start_values = {
        "gameTime": "00:00:00",
        "timeRoundPlayed": 0,
        "rounds": "0",
        "hitAverage": "0%",
        "language": "en",
        "difficulty": "medium",
        "pause": false,
        "gameOver": false
    }

    if (!localStorage.getItem("typingGame")) {
        localStorage.setItem("typingGame", JSON.stringify(start_values))
    } else {
        await unpause_time()
        const data = await get_data()
        data.gameOver = false
        data.timeRoundPlayed = 0
        localStorage.setItem("typingGame", JSON.stringify(data))
        console.log("data updated");
    }
}

export default init_db;