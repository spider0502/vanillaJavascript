const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const removeBtn = document.getElementById('remove')
const addContainer = document.getElementById('add-container')

//Keep track of current card
let currentActiveCard = 0

//Store DOM cards
const cardsEl = []

//Store card data
const cardsData = getCardsData()
// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ]

//Initiation
createCards()
updateCurrentText()

//Create cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}
//Create card
function createCard(data, index) {
    const card = document.createElement('div')
    card.classList.add('card')

    if (index === 0) {
        card.classList.add('active')
        currentActiveCard = 0
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>
    `

    card.addEventListener('click', () => card.classList.toggle('show-answer'))

    //Add to DOM cards
    cardsEl.push(card)

    cardsContainer.appendChild(card)

    updateCurrentText()
}

//Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

//Set cards to local storage
function setCardsData(cardsData) {
    localStorage.setItem('cards', JSON.stringify(cardsData))
}

//Show number of cards
function updateCurrentText() {
    const total = cardsEl.length
    if (total === 0) {
        currentEl.innerText = '0 / 0'
    } else {
        currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`
    }
}

//Event listeners
//Next button
nextBtn.addEventListener('click', () => {
    currentActiveCard++

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard--
    } else {
        cardsEl[currentActiveCard - 1].className = 'card left'
        cardsEl[currentActiveCard].className = 'card active'
        updateCurrentText()
    }
})
//Prev button
prevBtn.addEventListener('click', () => {
    currentActiveCard--

    if (currentActiveCard < 0) {
        currentActiveCard++
    } else {
        cardsEl[currentActiveCard + 1].className = 'card right'
        cardsEl[currentActiveCard].className = 'card active'
        updateCurrentText()
    }
})
//Show add-container
showBtn.addEventListener('click', () => addContainer.classList.add('show'))
//Hide add-container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))
//Add card button
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    if (question.trim() && answer.trim()) {
        const newCard = { question, answer }

        createCard(newCard, cardsData.length)

        questionEl.value = ''
        answerEl.value = ''

        addContainer.classList.remove('show')

        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})
//Delete card
removeBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].classList.remove('active')

    cardsEl.splice(currentActiveCard, 1)
    cardsData.splice(currentActiveCard, 1)

    if (cardsEl.length !== 0) {
        if (currentActiveCard < cardsEl.length) {
            cardsEl[currentActiveCard].classList.add('active')
        } else {
            cardsEl[--currentActiveCard].classList = 'card active'
        }

    }

    updateCurrentText()
    setCardsData(cardsData)
})