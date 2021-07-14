const scoreHG = document.getElementById("score"),
    timeHG = document.getElementById("time"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    drawingArea = document.querySelector(".drawingArea"),
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

const draw =
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

let boxRandom = [], randomWord,
    timeInterval, speedTime, lang,
    score = 0, turn = 0, time = 10,
    endGame = false

drawingArea.innerHTML = `<button onclick='initGame()'>Start Game</button>`

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
        setConfigs()
    } else {
        lang = Number(localStorage.getItem('lang'))
        speedTime = Number(localStorage.getItem('speedTime'))
        startGame()
    }
}

function startGame() {
    drawingArea.innerHTML = `<button onclick='setConfigs()'>Settings</button>`

    wordToDOM()
    container.style.display = "block"
    if (time > 0) timeInterval = setInterval(updateTime, speedTime)
    input.focus()
}

function setConfigs() {
    let diff, idm
    drawingArea.innerHTML = draw

    diff = document.querySelector('#difficulty') // access variable
    idm = document.querySelector('#language')

    if (localStorage.getItem('speedTime') !== null) {
        clearInterval(timeInterval)
        diff.value = localStorage.getItem('speedTime') // view selection historic 
        idm.value = localStorage.getItem('lang') // view selection historic 
    }

    drawingArea.addEventListener('submit', e => {
        event.preventDefault()

        speedTime = Number(diff.value)
        lang = Number(idm.value)

        startGame()
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
    time--
    timeHG.innerHTML = time + 's'

    if (time <= 0) {
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
    scoreHG.innerHTML = '0'
    timeHG.innerHTML = '10s'
    score = 0
    turn = 0
    time = 10
    input.value = ''
    initGame()
}