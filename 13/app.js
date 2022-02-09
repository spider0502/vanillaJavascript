const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textArea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
]

let voices = []
let curVoiceIdx = 0

//Init speech synth
const message = new SpeechSynthesisUtterance()

data.forEach(createBox)

getVoices()

//Create speech box
function createBox(item, index) {
    const box = document.createElement('div')

    const { image, text } = item

    box.classList.add('box')
    box.innerHTML = `
        <div id="img">
            <img src="${image}" alt="${text}" />
        </div>
        <p class="info">${text}</p>
    `

    box.addEventListener('click', () => {
        speakText(text)

        box.classList.add('active')
        setTimeout(() => box.classList.remove('active'), 800)
    })

    main.appendChild(box)
}

//Speak text
function speakText(text) {
    message.text = text
    message.voice = voices[curVoiceIdx]
    speechSynthesis.speak(message)
}

//Toggle text box 'show'
function toggleTextbox() {
    document.getElementById('text-box').classList.toggle('show')
}

//Get voices
function getVoices() {
    voices = speechSynthesis.getVoices()

    if (voices !== null && voices.length !== 0) {
        voices.forEach((v, index) => {
            const optionEl = document.createElement('option')

            optionEl.value = index
            optionEl.innerText = v.name

            voicesSelect.appendChild(optionEl)
        })
    }
}

//Read custom text
function readText() {
    if (textArea.value.trim() !== null) {
        speakText(textArea.value)
    }
}

//Event listeners
toggleBtn.addEventListener('click', toggleTextbox)
closeBtn.addEventListener('click', toggleTextbox)
speechSynthesis.addEventListener('voiceschanged', getVoices)
voicesSelect.addEventListener('change', (e) => curVoiceIdx = e.target.value)
readBtn.addEventListener('click', readText)