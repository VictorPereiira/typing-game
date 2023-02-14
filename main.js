// Utils
const $ = (value) => document.querySelector(value)
const innerHTML = (param) => $(param).innerHTML

const typedWordsHG = document.getElementById("typedWords")
const timeHG = document.getElementById("time")
const word = document.querySelector(".word")
const input = document.querySelector(".input")
const drawingArea = document.querySelector(".drawingArea")
const settingsIcon = document.querySelector("#settings-icon")
const container = document.querySelector(".container")
const blurArea = document.querySelector("#blur")

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

let boxRandom = [], randomWord
let timeInterval, speedTime, lang
let endGame = false, pause = false
let turn = 0, time = 10

let gameTime = 0, gameTimeFormat = '00:00:00'
let rounds = 0, hitAverage = 0
let typedWords = 0, difficultyLevel, points = 0
let timePlayed = 0, timePlayedInt, timePlayedFormat


// check conditional
if (localStorage.getItem('speedTime') !== null) {
    lang = Number(localStorage.getItem('lang'))
    gameTime = Number(localStorage.getItem('gameTime'))
    rounds = Number(localStorage.getItem('rounds'))
    gameTimeFormat = setTimeFormat(gameTime)

    if (lang === 0) {
        word.innerHTML = 'Happiness'
        input.placeholder = 'Write the word here!!!'
    }

    if (lang === 1) {
        word.innerHTML = 'Felicidade'
        input.placeholder = 'Escreva as palavras aqui!!!'
    }
} else {
    lang = 0
    speedTime = 600
}


// start ui
drawingArea.innerHTML = draw(0)
input.disabled = true

function draw(drw) {
    let text

    if (lang === 0) text = [
        ['Start Game'], ['Settings'], ['Language'],
        ['Difficulty'], ['Medium'], ['Hard'],
        ['Expert'], ['New Game'], ['Save'],
        ['Statistics'], ['Game Time'], ['Rounds'],
        ['Hit Average'], ['Time ran out'], ['Time Played'],
        ['Error Rate'], ['Difficulty'], ['Typed Words'],
        ['Points'], ['Main Menu'], ['Play Again']

    ]

    if (lang === 1) text = [
        ['Começar Jogo'], ['Configurações'], ['Idioma'],
        ['Dificuldade'], ['Médio'], ['Difícil'],
        ['Expert'], ['Novo Jogo'], ['Salvar'],
        ['Estatísticas'], ['Tempo de Jogo'], ['Rodadas'],
        ['Média de Acertos'], ['Tempo Finalizado'], ['Duração da Partida'],
        ['Taxa de Erro'], ['Difficuldade'], ['Palavras Escritas'],
        ['Pontos'], ['Menu Principal'], ['Jogar Novamente']
    ]

    let drawing = [
        [
            `<button class="button-startGame" onclick='initGame()'>${text[0]}</button>`
        ],
        [
            `<form action="">
                    <i class="fas fa-times" id="form-close-icon"></i>
                    <p class="settings-title">${text[1]}</p>
                    <div class="settings-controls">
                        <div>
                            <p for="language">${text[2]}</p>
                            <select id="language">
                                <option value="0">En</option>
                                <option value="1">Pt</option>
                            </select>
                        </div>
                        <div>
                            <p for="difficulty">${text[3]}</p>
                            <select id="difficulty" class="firstSelect">
                                <option value="1000">${text[4]}</option>
                                <option value="600">${text[5]}</option>
                                <option value="300">${text[6]}</option>
                            </select>
                        </div>
                    </div>
                    <button class="button-newGame">${text[7]}</button>
                    <button class="button-Save"type="submit">${text[8]}</button>   
                </form>`
        ],
        [
            `<div class="menu-container">
                    <i class="fas fa-times" id="menu-close-icon"></i>
                    <p class="statistics-title">${text[9]}</p>
                    <div class="menu-info">
                        <p>${text[10]}:<span>${gameTimeFormat}</span></p>
                        <p>${text[11]}:<span>${rounds}</span></p>
                        <p>${text[12]}:<span>...</span></p>
                    </div>
                    <div class="gitHubInfo">
                        <a href="https://github.com/VictorPereiira/typing-game"
                            target="blank">
                            <i class="fab fa-github">Github</i>
                        </a>
                    </div>
                <div>`
        ],
        [
            `<div class="endGame-container">
                    <h2>${text[13]}</h2 >
                    <p>${text[14]}: <span>${timePlayedFormat}</span></p>
                    <p>${text[15]}: <span>...</span></p>
                    <p>${text[16]}: <span>${difficultyLevel}</span></p>
                    <p>${text[17]}: <span>${typedWords}</span></p>
                    <div class="points-container">
                        <span>${text[18]}: </span> 
                        <span class="points-value">${points}</span>
                    </div>
                    <div>
                        <button class="button-quitGame" onclick='reloadPage()'>${text[19]}</button>
                        <button onclick='resetGame()'>${text[20]}</button>
                    </div>
                </div>`
        ]
    ]
    return drawing[drw]
}


// check words typing
input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        turn++
        updateTypedWords()
        checkLengthBoxRadom()
        wordToDOM()
        e.target.value = ''

        if (speedTime === 1000) return time += 2
        if (speedTime === 600) return time += 3
        if (speedTime === 300) return time += 5
    }
})


// init functions
function initGame() {
    if (localStorage.getItem('speedTime') === null) {
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
    timeInterval = setInterval(updateClock, speedTime)
    timePlayedInt = setInterval(timePlayedUp, 1000)

    input.focus()
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


// util functions
function setConfigs() {
    let diff, idm
    drawingArea.innerHTML = draw(1)
    settingsIcon.style.display = 'none'
    input.disabled = true
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
            input.disabled = false
            drawingArea.innerHTML = ''
            pause = false
            input.focus()
            setBlur()
        })

    document.querySelector('.button-newGame')
        .addEventListener('click', () => {
            clearInterval(timeInterval)
            clearInterval(timePlayedInt)
            input.disabled = false
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
            input.disabled = false
            pause = false
            input.focus()

            setBlur()
            console.log(idm.value);
            localStorage.setItem('lang', idm.value)
            localStorage.setItem('speedTime', diff.value)
        }
    })
}

function viewPopupMenu() {
    if (time > 0) settingsIcon.style.display = 'none'
    if (timeInterval !== undefined) pause = true
    input.disabled = true
    setBlur()

    drawingArea.innerHTML = draw(2, lang)

    document.querySelector('#menu-close-icon')
        .addEventListener('click', () => {
            if (timeInterval === undefined) drawingArea.innerHTML = draw(0, lang)
            else {
                drawingArea.innerHTML = ''
                settingsIcon.style.display = 'block'
                pause = false
                input.focus()
            }
            input.disabled = false
            setBlur()
        })
}


// control functions 
function updateClock() {
    if (pause) return

    time--
    timeHG.innerHTML = time + 's'

    if (time < 1) {
        clearInterval(timeInterval)
        clearInterval(timePlayedInt)
        gameOver()
    }
}

function updateTypedWords() {
    typedWords++
    typedWordsHG.innerHTML = typedWords
}

function timePlayedUp() {
    if (pause) return
    timePlayed++
}

function setTimeFormat(timeValue) {
    let timeFormatted = ""
    let minutes = ""
    let seconds = ""

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


// endGame functions 
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


// functions seconds
function checkLengthBoxRadom() {
    if (boxRandom.length === words[lang].length) boxRandom.splice(0, Number.MAX_VALUE)
}

function setBlur() {
    blurArea.classList.toggle('active')
}

function reloadPage() {
    location.reload()
}


document.addEventListener('keydown', e => {
    if (e.key === "Enter" && !endGame) e.preventDefault()
    else if (e.key === "Enter" && endGame) {
        e.preventDefault()
        resetGame()
    }
});



