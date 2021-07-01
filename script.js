const scoreHG = document.getElementById("score"),
    timeHG = document.getElementById("time"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    button = document.querySelector(".button"),
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

let boxRandom = [], randomWord,
    lang, pt = 'pt', en = 'en',
    timeInterval, score = 0, turn = 0, time = 10

button.innerHTML = "<button onclick='setToLanguage()'>Start Game</button>"


input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        turn++

        wordToDOM()
        updateScore()

        e.target.value = ''
    }
})


function startGame() {
    wordToDOM()
    container.style.display = "block"
    timeInterval = setInterval(updateTime, 1000)
    input.focus()
}


function setToLanguage() {
    button.innerHTML =
        `<h2>Choose a language </h2>
        <button onclick='setIdiom( ${en} )'>en</button>
        <button onclick='setIdiom( ${pt} )'>pt</button>`
}

function setIdiom(idiom) {
    button.innerHTML = ''

    if (idiom === 'en') lang = 0
    if (idiom === 'pt') lang = 1

    startGame()
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
        `<h2>GAME OVER</h2>
        <p>Your score was: ${score}</p>
        <button onclick='resetGame()'>Reset Game</button>`
}

function resetGame() {
    gameOverHG.innerHTML = ''

    score = 0
    turn = 0
    time = 10

    setToLanguage()
}