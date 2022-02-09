const main = document.getElementById('main')
const addUserBtn = document.getElementById('add_user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show_millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate_wealth')

let data = []

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillionairesBtn.addEventListener('click', showMillionaires)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calEntireWealth)

//Fetch random user
async function getRandomUser() {
    if (data.length >= 5)
        return

    const res = await fetch('https://randomuser.me/api')
    const dataRes = await res.json()

    const user = dataRes.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: +(Math.random() * 800000).toFixed(2)
    }

    addData(newUser)
}

//Add data
function addData(obj) {
    if (data.length >= 5)
        return

    data.push(obj)
    updateDOM()
}

//Update DOM
function updateDOM(userData = data) {
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong><span> Wealth</span></h2>'

    if (userData === null || userData.length === 0)
        return
    userData.forEach(u => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${u.name}</strong> $ ${formattMoney(u.money)}`
        main.appendChild(element)
    })
}

//init()

function init() {
    getRandomUser()
    getRandomUser()
    getRandomUser()
    getRandomUser()
    getRandomUser()
    getRandomUser()
    updateDOM()
}

//Formatt number as money
function formattMoney(num) {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//4 button fuctions below
function doubleMoney() {
    data.forEach(u => {    //array.map
        u.money = u.money * 2
    })
    updateDOM()
}

function showMillionaires() {
    const mllnData = data.filter(u => (
        u.money >= 1000000
    ))
    console.log(mllnData)
    updateDOM(mllnData)
}

function sortByRichest() {
    let sortedData = data
    sortedData.sort((a, b) => {
        return b.money - a.money
    })
    updateDOM(sortedData)
}

function calEntireWealth() {
    // const total = data.reduce((pre, cur) => {
    //     return {
    //         money: pre.money + cur.money
    //     }
    // })
    // const u = [{
    //     name: 'Total',
    //     money: total.money
    // }]
    const total = data.reduce((pre, cur) => (
        pre + cur.money
    ), 0)
    const u = [{
        name: 'Total',
        money: total
    }]
    updateDOM(u)
}