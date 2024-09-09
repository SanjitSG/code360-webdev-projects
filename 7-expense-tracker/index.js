let total_amount = 0;

function calc(e) {
  e.preventdefault();
  const expense_type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  if (expense_type == "income") {
    total_amount += amount;
  } else {
    total_amount -= amount;
  }
  console.log(total_amount);
}
