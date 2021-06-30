const scoreHG = document.querySelector(".score"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input")

const words = [
    'sigh', 'tense', 'airplane', 'ball', 'pies',
    'juice', 'warlike', 'bad', 'north', 'dependent',
    'steer', 'silver', 'highfalutin', 'superficial', 'quince',
    'eight', 'feeble', 'admit', 'drag', 'loving'
]

let randomWord, score = 0

wordToDow()

input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        wordToDow()
        updateScore()
        e.target.value = ''
    }
})

function wordToDow() {
    randomWord = words[Math.floor(Math.random() * words.length)]
    word.innerHTML = randomWord
}

function updateScore() {
    score++
    scoreHG.innerHTML = score
}
