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

let boxRandom = [],
    score = 0, turn = 0


input.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === words[randomNumber]) {
        turn++

        wordToDOM()
        updateScore()

        e.target.value = ''
    }
})


function startGame() {
    wordToDOM()
    button.style.display = "none"
    input.style.visibility = "visible"
    input.focus()
}

function wordToDOM() {
    if (turn < 1) {
        randomNumber = Math.floor(Math.random() * words.length)
        boxRandom.push(randomNumber)

        word.innerHTML = words[randomNumber]
    } else {
        noRepeat()
    }
}

function noRepeat() {
    while (boxRandom.indexOf(randomNumber) > -1) { // exists randomNumber repeats
        randomNumber = Math.floor(Math.random() * words.length)
    }

    boxRandom.push(randomNumber)
    word.innerHTML = words[randomNumber]
}

function updateScore() {
    score++
    scoreHG.innerHTML = score
}
