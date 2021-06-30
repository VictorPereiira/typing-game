const scoreHG = document.querySelector(".score"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    button = document.querySelector(".button")

const words = [
    'sigh', 'tense', 'airplane', 'ball', 'pies',
    'juice', 'warlike', 'bad', 'north', 'dependent',
    'steer', 'silver', 'highfalutin', 'superficial', 'quince',
    'eight', 'feeble', 'admit', 'drag', 'loving'
]

let randomWord, score = 0

input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        wordToDow()
        updateScore()
        e.target.value = ''
    }
})

function startGame() {
    button.style.display = "none"
    wordToDow()
    input.style.visibility = "visible"
    input.focus()
}

function wordToDow() {
    randomWord = words[Math.floor(Math.random() * words.length)]
    word.innerHTML = randomWord
}

function updateScore() {
    score++
    scoreHG.innerHTML = score
}
