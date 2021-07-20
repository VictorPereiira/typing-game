const typedWordsHG = document.getElementById("typedWords"),
    timeHG = document.getElementById("time"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    drawingArea = document.querySelector(".drawingArea"),
    settingsIcon = document.querySelector("#settings-icon"),
    container = document.querySelector(".container"),
    blurArea = document.querySelector("#blur")


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
        `<button class="button-startGame"onclick='initGame()'>Start Game</button>`
    ],
    [
        `<form action="">
            <i class="fas fa-times" id="form-close-icon"></i>
            <p class="settings-title">Settings</p>
            <div class="settings-controls">
                <div>
                    <p for="language">Language</p>
                    <select id="language">
                        <option value="0">En</option>
                        <option value="1">Pt</option>
                    </select>
                </div>
                <div>
                    <p for="difficulty">Difficulty</p>
                    <select id="difficulty" class="firstSelect">
                        <option value="1000">Medium</option>
                        <option value="600">Hard</option>
                        <option value="300">Expert</option>
                    </select>
                </div>
            </div>
            <button class="button-newGame">New Game</button>
            <button class="button-Save"type="submit">Save</button>   
        </form>`
    ]
]

let boxRandom = [], randomWord,
    timeInterval, speedTime, lang,
    typedWords = 0, turn = 0, time = 10,
    endGame = false, pause = false

drawingArea.innerHTML = draw[0]
input.disabled = true

input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        turn++
        updateTypedWords()
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
    drawingArea.innerHTML = ''
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
    settingsIcon.style.display = 'none'
    pause = true
    setBlur()

    idm = document.querySelector('#language') // access variables
    diff = document.querySelector('#difficulty')

    idm.value = localStorage.getItem('lang') // view selection historic
    diff.value = localStorage.getItem('speedTime')

    document.querySelector('#form-close-icon')
        .addEventListener('click', () => {
            settingsIcon.style.display = 'block'
            drawingArea.innerHTML = ''
            pause = false
            input.focus()
            setBlur()
        })

    document.querySelector('.button-newGame')
        .addEventListener('click', () => {
            clearInterval(timeInterval)
            pause = false
            input.value = ''

            localStorage.setItem('lang', idm.value)
            localStorage.setItem('speedTime', diff.value)
            input.focus()
            resetGame()
        })

    drawingArea.addEventListener('submit', e => {
        e.preventDefault()
        settingsIcon.style.display = 'block'
        drawingArea.innerHTML = ''
        pause = false
        input.focus()
        setBlur()

        localStorage.setItem('lang', idm.value)
        localStorage.setItem('speedTime', diff.value)
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

function updateTypedWords() {
    typedWords++
    typedWordsHG.innerHTML = typedWords
}

function updateTime() {
    if (pause) return
    time--
    timeHG.innerHTML = time + 's'

    if (time <= 0) {
        settingsIcon.style.display = 'none'
        clearInterval(timeInterval)
        input.value = ''
        endGame = true
        setBlur()
        gameOver()
    }
}

function setBlur() {
    blurArea.classList.toggle('active')
}

function viewPopupMenu() {
    if (time > 0) settingsIcon.style.display = 'none'
    pause = true
    setBlur()

    drawingArea.innerHTML =
        `<div class="menu-container">
            <i class="fas fa-times" id="menu-close-icon"></i>
            <h2>Statistics</h2>

            <p>Game Time <span>...</span></p>
            <p>Rounds <span>...</span></p>
            <p>Hit Average <span>...</span></p>
        <div>`

    document.querySelector('#menu-close-icon')
        .addEventListener('click', () => {
            if (timeInterval === undefined) drawingArea.innerHTML = draw[0]
            else {
                drawingArea.innerHTML = ''
                settingsIcon.style.display = 'block'
                pause = false
                input.focus()
            }
            setBlur()
        })
}

function gameOver() {
    drawingArea.innerHTML =
        `<div class="endGame-container">
            <h2>Time ran out</h2 >

            <p>Time Played: <span>...</span></p>
            <p>Error Rate: <span>...</span></p>
            <p>Difficulty: <span>...</span></p>
            <p>Typed Words: <span>${typedWords}</span></p>

            <div class="points-container">
                <span>Points: </span> 
                <span class="points-value">${typedWords}</span>
            </div>

            <button onclick='resetGame()'>New Game</button>
        </div>`
}

function resetGame() {
    boxRandom.splice(0, Number.MAX_VALUE)
    typedWordsHG.innerHTML = '0'
    timeHG.innerHTML = '10s'
    endGame = false
    typedWords = 0
    turn = 0
    time = 10
    setBlur()
    initGame()
}
