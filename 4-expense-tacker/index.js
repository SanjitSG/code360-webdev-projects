const expenseName = document.getElementById("expenseName");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const addExpenseButton = document.getElementById("addExpense");
const totalAmt = document.getElementById("totalAmount");

const expenseList = document.getElementById("expenseList");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const expense = {
    id: Date.now(),
    name: expenseName.value,
    amount: parseFloat(amountInput.value), // Ensure amount is stored as a number
    date: dateInput.value,
  };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  expenseName.value = "";
  amountInput.value = "";
  dateInput.value = "";

  displayExpenses();
}

function displayExpenses() {
  //getting expenses array
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Clear the existing expense list before appending new items
  expenseList.innerHTML = "";

  let total = 0;

  if (expenses.length > 0) {
    expenses.forEach((expense) => {
      total += expense.amount;

      //creating li element
      let li = document.createElement("li");

      //adding data to li
      li.innerHTML = `<span class="expense-name">${expense.name}</span> - $
            <span class="expense-amount">${expense.amount.toFixed(2)}</span> on <span class="expense-date">${expense.date}</span> <button onclick="removeExpense(${expense.id})">Remove</button>`;

      expenseList.append(li);
    });
  }

  totalAmt.textContent = total.toFixed(2); // Use totalAmt instead of totalAmount
}

function removeExpense(id) {
  // Remove the expense with the given id
  expenses = expenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

// Initial display of expenses on page load
displayExpenses();
