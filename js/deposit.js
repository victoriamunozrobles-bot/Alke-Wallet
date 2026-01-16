console.log("Depositos funciona");

const BALANCE_KEY = "wallet_total_balance";

function loadCurrentBalance() {
  const currentBalance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;

  $("#current-balance-display").text(`$${currentBalance.toLocaleString()}`);
}

function showBootstrapAlert(message, type = "info") {
  const alertHtml = `
    <div class="alert alert-${type} alert-dismissible fade show shadow" role="alert">
      ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;

  $("#alert-wrapper").html(alertHtml);
}

function makeDeposit() {
  const amount = parseFloat($("#amount").val());

  if (isNaN(amount) || amount <= 0) {
    showBootstrapAlert("Por favor, ingresa un monto válido.", "danger");
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

  $("#deposit-confirmation").html(`
    <div class="card bg-light mt-3">
      <div class="card-body py-2">
        <p class="mb-0 text-muted">
          <i class="fas fa-check-circle text-success"></i> 
          Monto depositado recientemente: <strong>$${amount.toLocaleString()}</strong>
        </p>
      </div>
    </div>
  `);
  showBootstrapAlert(
    `¡Depósito de $${amount.toLocaleString()} realizado con éxito!`,
    "success"
  );
  loadCurrentBalance();
  setTimeout(() => {
    window.location.href = "menu.html";
  }, 1500);
}

function saveToHistory(movement) {
  const history = JSON.parse(localStorage.getItem("wallet_transactions")) || [];
  history.push(movement);
  localStorage.setItem("wallet_transactions", JSON.stringify(history));
}

$(function () {
  $("#deposit__button").on("click", function (event) {
    event.preventDefault();
    makeDeposit();
  });
});

$(function () {
  loadCurrentBalance();

  $("#deposit__button").on("click", function (event) {
    event.preventDefault();
    makeDeposit();
  });
});
