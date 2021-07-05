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

let boxRandom = [], randomWord, lang, diff,
    timeInterval, SpeedTime, score = 0, turn = 0, time = 10

button.innerHTML = "<button onclick='setToLanguage()'>Start Game</button>"


input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        turn++
        checkLengthBoxRadom()
        wordToDOM()
        updateScore()
        e.target.value = ''

        if (SpeedTime === 1000) time += 2
        if (SpeedTime === 600) time += 3
        if (SpeedTime === 300) time += 5 
    }
})


function startGame() {
    wordToDOM()
    container.style.display = "block"
    timeInterval = setInterval(updateTime, SpeedTime)
    input.focus()
}

function setToLanguage() {
    button.innerHTML =
        `<h2>Choose a language </h2>
        <button onclick="setIdiom( 'en' )">en</button>
        <button onclick="setIdiom( 'pt' )">pt</button>`
}

function setIdiom(idiom) {
    button.innerHTML = ''

    if (idiom === 'en') lang = 0
    if (idiom === 'pt') lang = 1

    giveDifficulty()
}

function giveDifficulty (){
    button.innerHTML =  
        `<h2>Choose a Difficulty</h2>
        <button onclick="setDifficulty( 0 )">Medium</button>
        <button onclick="setDifficulty( 1 )">Hard</button>
        <button onclick="setDifficulty( 2 )">Expert</button>`
}

function setDifficulty(difficulty) {
    button.innerHTML = ''

    if (difficulty === 0) SpeedTime = 1000 ;
    if (difficulty === 1) SpeedTime = 600 ;
    if (difficulty === 2) SpeedTime = 300 ;

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
        `<h2>Time ran out</h2>
        <p>Your score was: ${score}</p>
        <button onclick='resetGame()'>Reset Game</button>`
}

function resetGame() {
    gameOverHG.innerHTML = ''
    scoreHG.innerHTML = ''
    timeHG.innerHTML = ''
    score = 0
    turn = 0
    time = 10
    input.value = ''
    setToLanguage()
}