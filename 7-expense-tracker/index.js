let total_amount = 0;
const form = document.getElementById("budget-form");

form.addEventListener("submit", calc);

function calc(e) {
  e.preventDefault();

  const expense_type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;

  if (expense_type == "income") {
    total_amount += parseFloat(amount);
  } else {
    total_amount -= parseFloat(amount);
  }
  document.getElementById("total-budget").textContent = "$" + total_amount.toFixed(2);
}
