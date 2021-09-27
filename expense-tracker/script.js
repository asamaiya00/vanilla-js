const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(sign == "+" ? "plus" : "minus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" 
  onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "")
    alert("Please enter text and amount");
  else {
    const trans = {
      id: Math.floor(Math.random() * 1000000000),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(trans);

    addTransactionToDOM(trans);

    updateLocalStorage();

    updateValues();

    text.value = "";
    amount.value = "";
  }
}

function removeTransaction(id) {
  transactions = transactions.filter((trans) => trans.id !== id);
  updateLocalStorage();
  init();
}

function updateValues() {
  const amounts = transactions.map((t) => t.amount);

  const total = amounts.reduce((acc, amt) => acc + amt, 0).toFixed(2);

  const income = amounts
    .filter((trans) => trans >= 0)
    .reduce((acc, amt) => acc + amt, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((trans) => trans < 0).reduce((acc, amt) => acc + amt, 0) * -1
  ).toFixed(2);

  balance.innerHTML = `₹${total}`;
  money_plus.innerHTML = `₹${income}`;
  money_minus.innerHTML = `₹${expense}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
