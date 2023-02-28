import App from "./src/App.js";
import activeButtonsFun from "./src/function/index.js";

// const typedWordsHG = document.getElementById("typedWords")
// const timeHG = document.getElementById("time")
// const word = document.querySelector(".word")
// const input = document.querySelector(".input")
// const drawingArea = document.querySelector(".drawingArea")
// const settingsIcon = document.querySelector("#settings-icon")
// const container = document.querySelector(".container")
// const blurArea = document.querySelector("#blur")

(async () => {
    await App();
    await activeButtonsFun();
})()

// async function _init_() {
//     let boxRandom = []
//     let randomWord = 0
//     let timeInterval = 0
//     let speedTime = 0
//     let lang = "english"
//     let endGame = false
//     let pause = false
//     let turn = 0
//     let time = 10

//     let gameTime = 0
//     let gameTimeFormat = '00:00:00'
//     let rounds = 0
//     let hitAverage = 0
//     let typedWords = 0
//     let difficultyLevel
//     let points = 0
//     let timePlayed = 0
//     let timePlayedInt = 0
//     let timePlayedFormat = 0

//     // check conditional
//     if (localStorage.getItem('speedTime') !== null) {
//         lang = Number(localStorage.getItem('lang'))
//         gameTime = Number(localStorage.getItem('gameTime'))
//         rounds = Number(localStorage.getItem('rounds'))
//         gameTimeFormat = setTimeFormat(gameTime)

//         if (lang === 0) {
//             word.innerHTML = 'Happiness'
//             input.placeholder = 'Write the word here!!!'
//         }

//         if (lang === 1) {
//             word.innerHTML = 'Felicidade'
//             input.placeholder = 'Escreva as palavras aqui!!!'
//         }
//     } else {
//         lang = 0
//         speedTime = 600
//     }

//     // start ui
//     drawingArea.innerHTML = draw(0)
//     input.disabled = true

//     // check words typing
//     input.addEventListener('input', e => {
//         const insertedText = e.target.value

//         if (insertedText === randomWord) {
//             turn++
//             updateTypedWords()
//             checkLengthBoxRadom()
//             wordToDOM()
//             e.target.value = ''

//             if (speedTime === 1000) return time += 2
//             if (speedTime === 600) return time += 3
//             if (speedTime === 300) return time += 5
//         }
//     })


//     document.addEventListener('keydown', e => {
//         if (e.key === "Enter" && !endGame) e.preventDefault()
//         else if (e.key === "Enter" && endGame) {
//             e.preventDefault()
//             resetGame()
//         }
//     });
// }