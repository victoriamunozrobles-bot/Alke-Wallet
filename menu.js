const balanceDisplay = document.querySelector("#balance");
const depositButton = document.querySelector("#deposit__button");
const sendMoneyButton = document.querySelector("#sendMoney__button");
const movementsButton = document.querySelector("#movements__button");

const BALANCE_KEY = "wallet_total_balance";

function updateBalanceDisplay() {
  const savedBalance = localStorage.getItem(BALANCE_KEY) || 0;
  balanceDisplay.textContent = `$${savedBalance}`;
}
function navigateTo(page) {
  window.open(page, "_self");
}

function notifyAndRedirect(button, screen, screenName) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    alert(`Redirigiendo a ${screenName}`);
    navigateTo(screen);
  });
}

document.addEventListener("DOMContentLoaded", updateBalanceDisplay);

notifyAndRedirect(depositButton, "deposit.html", "Depositar");
notifyAndRedirect(sendMoneyButton, "sendmoney.html", "Enviar dinero");
notifyAndRedirect(movementsButton, "transactions.html", "Últimos movimientos");
