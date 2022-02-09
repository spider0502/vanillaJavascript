

const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
]

const localTransactions = JSON.parse(localStorage.getItem('transactions'))

console.log(localTransactions)

let transactions = localTransactions === null ? [] : localTransactions

//Add transaction
function addTransaction(e) {
    e.preventDefault()

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Input data missed!')
    } else {
        const transaction = {
            id: Date.now(),
            text: text.value,
            amount: +amount.value,
        }

        transactions.push(transaction)
        updataLocalStorage()

        addTransactionDOM(transaction)

        updateValues()

        text.value = ''
        amount.value = ''
    }
}

//Add transactions to DOM list
function addTransactionDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item)
}

//Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map((t) => t.amount)

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2)

    const income = amounts.reduce((acc, item) => acc + (item > 0 ? item : 0), 0).toFixed(2)

    const expense = amounts.reduce((acc, item) => acc + (item < 0 ? item : 0), 0).toFixed(2)

    balance.innerHTML = `$${total}`
    money_plus.innerHTML = `+$${income}`
    money_minus.innerHTML = `-$${expense}`
}

//Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id)
    updataLocalStorage()
    init()
}

//Update local storage
function updataLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

//Init app
function init() {
    list.innerHTML = ''

    transactions.forEach(addTransactionDOM)

    updateValues()
}

init()

form.addEventListener('submit', addTransaction)