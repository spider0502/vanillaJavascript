const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
]

//Init word
let randomWord

//Init score
let score = 0

//Init time
let time = 10

//Difficulty
let difficulty = 'medium'
const diffTable = {
    easy: 5,
    medium: 3,
    hard: 1
}
let bonusTime

//Initiation
text.focus()
addWordToDOM()
initDifficulty()

//Init diff
function initDifficulty() {
    const stoDiff = localStorage.getItem('difficulty')
    if (stoDiff) {
        difficultySelect.value = stoDiff
    }
    difficultySelect.value = difficulty
    bonusTime = diffTable[difficulty]
    //console.log(bonusTime)
}

//Start counting down
const timeInterval = setInterval(updateTime, 1000)

//Generate random word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

//Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

//Update score
function updataScore() {
    score++
    scoreEl.innerHTML = score
}

//Update time
function updateTime() {
    time--
    timeEl.innerHTML = `${time}s`

    if (time === 0) {
        //Gameover
        gameOver()
    }
}
//Add time
function addBonusTime() {
    time += bonusTime
    timeEl.innerHTML = `${time}s`
}

//Gameover
function gameOver() {
    clearInterval(timeInterval)
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `
    endgameEl.style.display = 'flex'
}

//Typing listener
text.addEventListener('input', (e) => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        addWordToDOM()

        //Clear
        e.target.value = ''
        updataScore()
        addBonusTime()
    }
})

//Setting
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

//Difficulty select
difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value
    bonusTime = diffTable[difficulty]
    localStorage.setItem('difficulty', difficulty)
})
