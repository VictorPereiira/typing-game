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

let boxRandom = [], randomWord,
    timeInterval, speedTime, lang,
    endGame = false, pause = false,
    turn = 0, time = 10

let gameTime = 0, gameTimeFormat = '00:00:00',
    rounds = 0, hitAverage = 0,
    typedWords = 0, difficultyLevel, points = 0,
    timePlayed = 0, timePlayedInt, timePlayedFormat

function draw(drw) {
    let drawing = [
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
        ],
        [
            `<div class="menu-container">
                    <i class="fas fa-times" id="menu-close-icon"></i>
                    <p class="statistics-title">Statistics</p>
                    <div class="menu-info">
                        <p>Game Time <span>${gameTimeFormat}</span></p>
                        <p>Rounds <span>${rounds}</span></p>
                        <p>Hit Average <span>...</span></p>
                    </div>
                <div>`
        ],
        [
            `<div class="endGame-container">
                    <h2>Time ran out</h2 >
                    <p>Time Played: <span>${timePlayedFormat}</span></p>
                    <p>Error Rate: <span>...</span></p>
                    <p>Difficulty: <span>${difficultyLevel}</span></p>
                    <p>Typed Words: <span>${typedWords}</span></p>
                    <div class="points-container">
                        <span>Points: </span> 
                        <span class="points-value">${points}</span>
                    </div>
                    <button onclick='resetGame()'>Play Again</button>
                </div>`
        ]
    ]

    return drawing[drw]
}


drawingArea.innerHTML = draw(0)
input.disabled = true

if (localStorage.getItem('speedTime') !== null) {
    gameTime = Number(localStorage.getItem('gameTime'))
    rounds = Number(localStorage.getItem('rounds'))

    gameTimeFormat = setTimeFormat(gameTime)
}


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
        localStorage.setItem('gameTime', gameTime)
        localStorage.setItem('rounds', rounds)
    } else {
        lang = Number(localStorage.getItem('lang'))
        speedTime = Number(localStorage.getItem('speedTime'))
    }
    startGame()
}

function startGame() {
    drawingArea.innerHTML = ''
    settingsIcon.style.display = 'block'

    input.disabled = false
    input.placeholder = ''

    wordToDOM()
    timeInterval = setInterval(updateTime, speedTime)
    timePlayedInt = setInterval(timePlayedUp, 1000)

    input.focus()
}

function setConfigs() {
    let diff, idm
    drawingArea.innerHTML = draw(1)
    settingsIcon.style.display = 'none'
    pause = true
    setBlur()

    // access variables
    idm = document.querySelector('#language')
    diff = document.querySelector('#difficulty')

    // view selection historic
    idm.value = localStorage.getItem('lang')
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
            clearInterval(timePlayedInt)
            pause = false
            input.value = ''
            timePlayed = 0

            localStorage.setItem('lang', idm.value)
            localStorage.setItem('speedTime', diff.value)
            input.focus()
            resetGame()
        })

    drawingArea.addEventListener('submit', e => {
        e.preventDefault()

        // if = prevent recall
        if (pause === true) {
            settingsIcon.style.display = 'block'
            drawingArea.innerHTML = ''
            pause = false
            input.focus()

            setBlur()
            localStorage.setItem('lang', idm.value)
            localStorage.setItem('speedTime', diff.value)
        }
    })
}

function checkLengthBoxRadom() {
    if (boxRandom.length === words[lang].length) boxRandom.splice(0, Number.MAX_VALUE)
}

function setBlur() {
    blurArea.classList.toggle('active')
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
    console.log("updateTime");

    time--
    timeHG.innerHTML = time + 's'

    if (time < 1) {
        clearInterval(timeInterval)
        clearInterval(timePlayedInt)
        gameOver()
    }
}

function timePlayedUp() {
    if (pause) return
    console.log("timePlayedUP");
    timePlayed++
}

function setTimeFormat(timeValue) {
    let timeFormatted,
        minutes, seconds

    if (timeValue <= 60) {
        if (timeValue < 10) timeFormatted = `00:00:0${timeValue}`
        else timeFormatted = `00:00:${timeValue}`
    }

    if (timeValue === 60) timeFormatted = `00:01:00`

    if (timeValue > 60) {
        minutes = Math.floor(timeValue / 60)
        seconds = timeValue % 60

        if (minutes < 10) minutes = `0${minutes}`
        if (seconds < 10) seconds = `0${seconds}`

        timeFormatted = `00:${minutes}:${seconds}`
    }

    if (minutes === 60) timeFormatted = `01:00:00`

    return timeFormatted
}

function setPoints() {
    if (turn > 0) {
        if (difficultyLevel === 'Medium') setValuePoints(5, 2)
        if (difficultyLevel === 'Hard') setValuePoints(10, 3)
        if (difficultyLevel === 'Expert') setValuePoints(20, 5)

        function setValuePoints(wordValue, roundTimeValue) {
            points = typedWords * wordValue
            points += timePlayed * roundTimeValue
        }

        // bonus for time played
        if (timePlayed === 60) points += 50
        if (timePlayed === 120) points += 100
        if (timePlayed === 300) points += 200

        // bonus for word typed
        if (typedWords === 5) points += 20
        if (typedWords === 15) points += 50
        if (typedWords === boxRandom.length) points += 100
    }
}


function viewPopupMenu() {
    if (time > 0) settingsIcon.style.display = 'none'
    if (timeInterval !== undefined) pause = true
    setBlur()

    drawingArea.innerHTML = draw(2)

    document.querySelector('#menu-close-icon')
        .addEventListener('click', () => {
            if (timeInterval === undefined) drawingArea.innerHTML = draw(0)
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
    if (turn > 0) {
        gameTime += timePlayed
        rounds++

        // save value
        localStorage.setItem('gameTime', gameTime)
        localStorage.setItem('rounds', rounds)

        // view values
        gameTimeFormat = setTimeFormat(gameTime)
    }

    if (speedTime === 1000) difficultyLevel = 'Medium'
    if (speedTime === 600) difficultyLevel = 'Hard'
    if (speedTime === 300) difficultyLevel = 'Expert'

    timePlayedFormat = setTimeFormat(timePlayed)

    setPoints()
    setBlur()
    endGame = true
    pause = true
    settingsIcon.style.display = 'none'
    drawingArea.innerHTML = draw(3)
}

function resetGame() {
    boxRandom.splice(0, Number.MAX_VALUE)
    typedWordsHG.innerHTML = '0'
    timeHG.innerHTML = '10s'
    input.value = ''
    endGame = false
    pause = false
    typedWords = 0
    timePlayed = 0
    points = 0
    turn = 0
    time = 10
    setBlur()
    initGame()
}


