const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

//Store the lis
const listItems = []

let dragStartIndex

createList()

//Create the list
function createList() {
    [...richestPeople]
        .map((a) => ({ value: a, sort: Math.random() }))
        .sort((a, b) => (a.sort - b.sort))
        .map((p) => (p.value))
        .forEach((person, index) => {
            const listItem = document.createElement('li')

            listItem.setAttribute('data-index', index)
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `

            listItems.push(listItem)

            draggable_list.appendChild(listItem)
        })

    addEventListener()
}

function dragStart() {
    // console.log('Event: ', 'start')
    dragStartIndex = this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex)
}
function dragEnter(e) {
    // console.log('Event: ', 'enter')
    this.classList.add('over')
}
function dragLeave(e) {
    // console.log('Event: ', 'leave')
    this.classList.remove('over')
}
function dragOver(e) {
    // console.log('Event: ', 'over')
    e.preventDefault()
}
function dragDrop() {
    // console.log('Event: ', 'drop')
    const dragEndIndex = this.getAttribute('data-index')

    this.classList.remove('over')
    //swap dragged and drop-on
    swapItems(dragStartIndex, dragEndIndex)
}

//Swap drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

//Check order
function checkOrder() {
    listItems.forEach((item, index) => {
        const name = item.querySelector('.person-name').innerText

        if (name === richestPeople[index]) {
            item.classList.add('right')
            item.classList.remove('wrong')
        } else {
            item.classList.add('wrong')
            item.classList.remove('right')
        }
    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach((item) => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)