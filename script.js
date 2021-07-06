const scoreHG = document.getElementById("score"),
    timeHG = document.getElementById("time"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    drawingArea = document.querySelector(".drawingArea"),
    settings = document.querySelector(".settings"),
    container = document.querySelector(".container"),
    gameOverHG = document.querySelector(".gameOver")


const words = [
    [
        'sigh', 'tense', 'airplane', 'ball', 'pies',
        'juice', 'warlike', 'bad', 'north', 'dependent',
        'steer', 'silver', 'highfalutin', 'superficial', 'quince',
        'eight', 'feeble', 'admit', 'drag', 'loving'
    ],
    [
        'suspiro', 'tenso', 'avião', 'bola', 'tortas',
        'suco', 'guerreiro', 'mau', 'norte', 'dependente',
        'boi', 'prata', 'pomposo', 'superficial', 'marmelo',
        'oito', 'fraco', 'admitir', 'arrastar', 'amoroso'
    ]
]

let boxRandom = [], randomWord, lang,
    timeInterval, SpeedTime,
    score = 0, turn = 0, time = 10

drawingArea.innerHTML = "<button onclick='initGame()'>Start Game</button>"

input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        turn++
        checkLengthBoxRadom()
        wordToDOM()
        updateScore()
        e.target.value = ''

        if (speedTime === 1000) time += 2
        if (speedTime === 600) time += 3
        if (speedTime === 300) time += 5
    }
})


function initGame() {
    if (localStorage.getItem('speedTime') === null) setToLanguage()
    else {
        lang = localStorage.getItem('lang')
        speedTime = localStorage.getItem('speedTime')
        startGame()
    }
}

function startGame() {
    settings.innerHTML = `<button onclick='config()'>Settings</button>`
    drawingArea.innerHTML = ''

    wordToDOM()
    container.style.display = "block"
    timeInterval = setInterval(updateTime, speedTime)
    input.focus()
}

function setToLanguage() {
    drawingArea.innerHTML =
        `<h2>Choose a language </h2>
        <button onclick="setIdiom( 'en' )">EN</button>
        <button onclick="setIdiom( 'pt' )">PT</button>`
}

function setIdiom(idiom) {
    drawingArea.innerHTML = ''

    if (idiom === 'en') lang = 0
    if (idiom === 'pt') lang = 1

    localStorage.setItem('lang', lang)
    giveDifficulty()
}

function giveDifficulty() {
    drawingArea.innerHTML =
        `<h2>Choose a Difficulty</h2>
        <button onclick="setDifficulty( 0 )">Medium</button>
        <button onclick="setDifficulty( 1 )">Hard</button>
        <button onclick="setDifficulty( 2 )">Expert</button>`
}

function setDifficulty(difficulty) {

    if (difficulty === 0) speedTime = 1000;
    if (difficulty === 1) speedTime = 600;
    if (difficulty === 2) speedTime = 300;

    localStorage.setItem('speedTime', speedTime)
    startGame()
}

function checkLengthBoxRadom() {
    if (boxRandom.length === words[lang].length) boxRandom.splice(0, Number.MAX_VALUE)
}

function wordToDOM() {
    overall = words[lang].length

    if (turn < 1) {
        randomNumber = Math.floor(Math.random() * overall)
        randomWord = words[lang][randomNumber]

        boxRandom.push(randomNumber)
        word.innerHTML = randomWord
    } else {
        noRepeat()
    }
}

function noRepeat() {
    while (boxRandom.indexOf(randomNumber) > -1) { // exists randomNumber repeats
        randomNumber = Math.floor(Math.random() * overall)
    }

    randomWord = words[lang][randomNumber]
    boxRandom.push(randomNumber)
    word.innerHTML = randomWord
}

function config() {
    console.log('settings: on')

    settings.innerHTML =
        `<button onclick=configDifficulty()>Difficulty</button>
        <button onclick=configLanguage()>Language</button>`

}

function configDifficulty() {
    settings.innerHTML =
        `<form id="settings-form">
            <label for="difficulty">Difficulty</label>
            <select id="difficulty">
                <option value="1000">Medium</option>
                <option value="600">Hard</option>
                <option value="300">Expert</option>
            </select>
        </form>`

    settings.addEventListener('change', e => {
        difficulty = e.target.value
        localStorage.setItem('speedTime', difficulty)
    })
}

function configLanguage() {
    settings.innerHTML =
        `<form id="settings-form">
            <label for="language">Language</label>
            <select id="language">
                <option value="0">EN</option>
                <option value="1">PT</option>
            </select>
        </form>`

    settings.addEventListener('change', e => {
        language = e.target.value
        localStorage.setItem('lang', language)
    })
}

function updateScore() {
    score++
    scoreHG.innerHTML = score
}

function updateTime() {
    time--
    timeHG.innerHTML = time + 's'

    if (time === 0) {
        clearInterval(timeInterval)
        gameOver()
    }
}

function gameOver() {
    container.style.display = 'none'

    gameOverHG.innerHTML =
        `<h2>Time ran out</h2 >
        <p>Your score was: ${score}</p>
        <button onclick='resetGame()'>New Game</button>`
}

function resetGame() {
    boxRandom.splice(0, Number.MAX_VALUE)
    gameOverHG.innerHTML = ''
    scoreHG.innerHTML = ''
    timeHG.innerHTML = ''
    score = 0
    turn = 0
    time = 10
    input.value = ''
    initGame()
}