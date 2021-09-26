const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");

const transactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Cash", amount: 300 },
  { id: 3, text: "Food", amount: -100 },
  { id: 4, text: "Cheque", amount: 500 },
];

function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? "+" : "-";
  const item = document.createElement("li");

  item.classList.add(sign == "+" ? "plus" : "minus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;

  list.appendChild(item);
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
}

init();
