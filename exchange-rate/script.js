const currencyEl_one = document.getElementById('currency-one')
const currencyEl_two = document.getElementById('currency-two')
const amount_one = document.getElementById('amount-one')
const amount_two = document.getElementById('amount-two')

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

currencyEl_one.addEventListener('change',calculate)
currencyEl_two.addEventListener('change',calculate)
amount_one.addEventListener('input',calculate)
amount_two.addEventListener('input',calculate)

function calculate() {
    const cur1 = currencyEl_one.value
    const cur2 = currencyEl_two.value
    fetch(`https://open.exchangerate-api.com/v6/latest/${cur1}`)
    .then(res => res.json())
    .then(data=> 
        {
            const rate = data.rates[cur2];
            rateEl.innerText = `1 ${cur1} = ${rate} ${cur2}`
            amount_two.value = (rate * amount_one.value).toFixed(2)
        })
}

swap.addEventListener('click',() => {
    const temp = currencyEl_one.value
    currencyEl_one.value = currencyEl_two.value
    currencyEl_two.value = temp
    calculate()
})

calculate()