const amountInput = document.querySelector("#amount");
const depositButton = document.querySelector("#deposit__button");

const BALANCE_KEY = "wallet_total_balance";

function makeDeposit() {
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  const currentBalance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;

  const newBalance = currentBalance + amount;

  localStorage.setItem(BALANCE_KEY, newBalance);

  const newMovement = {
    type: "Depósito",
    amount: amount,
    date: new Date().toLocaleString(),
    details: "Carga de saldo",
  };
  saveToHistory(newMovement);

  alert(`¡Depósito de $${amount} realizado con éxito!`);
  window.location.href = "menu.html";
}

function saveToHistory(movement) {
  const history = JSON.parse(localStorage.getItem("wallet_transactions")) || [];
  history.push(movement);
  localStorage.setItem("wallet_transactions", JSON.stringify(history));
}

depositButton.addEventListener("click", (event) => {
  event.preventDefault();
  makeDeposit(amountInput.value);
});
