async function init_db() {
    const start_values = {
        "gameTime": "00:00:00",
        "rounds": "0",
        "hitAverage": "0%",
        "language": "en",
        "difficulty": "medium",
        "speedTime": "1000",
    }

    if (!localStorage.getItem("typingGame")) {
        localStorage.setItem("typingGame", JSON.stringify(start_values))
    } else {
        console.log("data updated");
    }
}

export default init_db;