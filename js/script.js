const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const elementMessage = document.querySelector('.winning-message')
const textMessage = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('btnRestart')

let circleTurn

startGame()

function startGame() {
    circleTurn = false

    cellElements.forEach((cell) => {
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass()
}

restartButton.addEventListener('click', restartGame)

function restartGame() {
    elementMessage.classList.remove('show')
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
    })
    startGame()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    // place mark
    placeMark(cell, currentClass)

    // check win
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        // switch turn
        switchTurn()

        // set board hover class
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        textMessage.innerText = 'Draw!'
    } else {
        textMessage.innerText = `${circleTurn ? 'O' : 'X'} wins!`
    }

    elementMessage.classList.add('show')
}

function isDraw() {
    return [...cellElements].every((cell) => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
