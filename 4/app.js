const currencyEl_one = document.getElementById('currency-one')
const amountEl_one = document.getElementById('amount-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_two = document.getElementById('amount-two')

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

//Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value
    const currency_two = currencyEl_two.value
    const amount_one = +amountEl_one.value
    const amount_two = +amountEl_two.value

    fetch(` https://open.er-api.com/v6/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const rate = data.rates[currency_two]
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
            amountEl_two.value = (amount_one * rate).toFixed(2)
        })
        .catch(err => console.log(err))
}

//Event listeners
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
//amountEl_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value
    currencyEl_one.value = currencyEl_two.value
    currencyEl_two.value = temp
    calculate()
})

calculate()