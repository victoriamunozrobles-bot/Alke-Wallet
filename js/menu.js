const BALANCE_KEY = "wallet_total_balance";

function showBootstrapAlert(message, type = "info") {
  const alertHtml = `
    <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
      <strong>Aviso:</strong> ${message}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;

  $("#alert-wrapper").append(alertHtml);

  setTimeout(() => {
    $(".alert").alert("close");
  }, 5000);
}

function updateBalanceDisplay() {
  const savedBalance = localStorage.getItem(BALANCE_KEY) || 0;
  $("#balance").text(`$${parseFloat(savedBalance).toLocaleString()}`);
}

function navigateTo(page) {
  window.open(page, "_self");
}

function notifyAndRedirect(selector, screen, screenName) {
  $(selector).on("click", function (event) {
    event.preventDefault();

    showBootstrapAlert(`Preparando todo para ${screenName}...`, "primary");

    setTimeout(() => {
      navigateTo(screen);
    }, 1200);
  });
}

$("#btn-logout-nav").on("click", function () {
  // Opcional: Si quieres borrar los datos al salir, descomenta la siguiente línea:
  // localStorage.clear();

  // Redirigir al Login (index.html está fuera de la carpeta pages)
  window.location.href = "../index.html";
});
$(function () {
  updateBalanceDisplay();

  notifyAndRedirect("#deposit__button", "deposit.html", "Depositar");
  notifyAndRedirect("#sendMoney__button", "sendmoney.html", "Enviar dinero");
  notifyAndRedirect(
    "#movements__button",
    "transactions.html",
    "Últimos movimientos"
  );
});
