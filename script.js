const scoreHG = document.getElementById("score"),
    timeHG = document.getElementById("time"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    drawingArea = document.querySelector(".drawingArea"),
    settingsIcon = document.querySelector("#settings-icon"),
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

const draw = [
    [
        `<button onclick='initGame()'>Start Game</button>`
    ],
    [
        `<form action="">
            <label for="difficulty">Difficulty</label>
            <select id="difficulty">
                <option value="1000">Medium</option>
                <option value="600">Hard</option>
                <option value="300">Expert</option>
            </select>
            <label for="language">Language</label>
            <select id="language">
                <option value="0">EN</option>
                <option value="1">PT</option>
            </select>
            <button type="submit">Save</button>
        </form>`
    ]
]
let boxRandom = [], randomWord,
    timeInterval, speedTime, lang,
    score = 0, turn = 0, time = 10,
    endGame = false, pause = false

drawingArea.innerHTML = draw[0]
input.disabled = true

input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        turn++
        updateScore()
        checkLengthBoxRadom()
        wordToDOM()
        e.target.value = ''

        if (speedTime === 1000) time += 2
        if (speedTime === 600) time += 3
        if (speedTime === 300) time += 5
    }
})


function initGame() {
    if (localStorage.getItem('speedTime') === null) {
        lang = 0
        speedTime = 600
        localStorage.setItem('lang', lang)
        localStorage.setItem('speedTime', speedTime)
    } else {
        lang = Number(localStorage.getItem('lang'))
        speedTime = Number(localStorage.getItem('speedTime'))
    }
    startGame()
}

function startGame() {
    settingsIcon.style.display = 'block'
    settingsIcon.addEventListener('click', setConfigs)
    input.disabled = false
    input.placeholder = ''

    wordToDOM()
    timeInterval = setInterval(updateTime, speedTime)
    input.focus()
}

function setConfigs() {
    let diff, idm
    drawingArea.innerHTML = draw[1]
    input.disabled = true

    diff = document.querySelector('#difficulty') // access variable
    idm = document.querySelector('#language')

    if (localStorage.getItem('speedTime') !== null) {
        diff.value = localStorage.getItem('speedTime') // view selection historic 
        idm.value = localStorage.getItem('lang') // view selection historic 
        pause = true
    }

    drawingArea.addEventListener('submit', e => {
        e.preventDefault()
        input.disabled = false

        pause = false
        speedTime = Number(diff.value)
        lang = Number(idm.value)

        localStorage.setItem('speedTime', speedTime)
        localStorage.setItem('lang', lang)
    })
}

function checkLengthBoxRadom() {
    if (boxRandom.length === words[lang].length) boxRandom.splice(0, Number.MAX_VALUE)
}

function wordToDOM() {
    overall = words[lang].length

    if (turn < 1) {
        randomNumber = Math.floor(Math.random() * overall)
    } else {
        while (boxRandom.indexOf(randomNumber) > -1) { // exists randomNumber repeats
            randomNumber = Math.floor(Math.random() * overall)
        }
    }

    randomWord = words[lang][randomNumber]
    boxRandom.push(randomNumber)
    word.innerHTML = randomWord
}

function updateScore() {
    score++
    scoreHG.innerHTML = score
}

function updateTime() {
    if (pause) return
    time--
    timeHG.innerHTML = time + 's'

    if (time <= 0) {
        clearInterval(timeInterval)
        input.disabled = true
        input.value = ''
        gameOver()
    }
}

function gameOver() {
    gameOverHG.innerHTML =
        `<h2>Time ran out</h2 >
        <p>Your score was: ${score}</p>
        <button onclick='resetGame()'>New Game</button>`
}

function resetGame() {
    boxRandom.splice(0, Number.MAX_VALUE)
    gameOverHG.innerHTML = ''
    scoreHG.innerHTML = '0'
    timeHG.innerHTML = '10s'
    score = 0
    turn = 0
    time = 10
    initGame()
}