const scoreHG = document.querySelector(".score"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    button = document.querySelector(".button")

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
    score = 0, turn = 0

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
    input.style.visibility = "visible"
    wordToDOM()
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
