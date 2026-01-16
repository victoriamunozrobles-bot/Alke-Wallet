function getTipoTransaccion(tipo) {
  const tipos = {
    Depósito: "Depósito Realizado",
    Transferencia: "Transferencia Enviada",
    Compra: "Compra Realizada",
  };
  return tipos[tipo] || tipo;
}

function mostrarUltimosMovimientos(filtro = "todos") {
  const history = JSON.parse(localStorage.getItem("wallet_transactions")) || [];
  const $list = $("#transactions-list");

  $list.empty();

  const filteredHistory = history.filter((mov) => {
    if (filtro === "todos") return true;
    return mov.type === filtro;
  });

  if (filteredHistory.length === 0) {
    $list.html(
      '<li class="list-group-item text-center">No hay movimientos para este tipo.</li>'
    );
    return;
  }

  [...filteredHistory].reverse().forEach((mov) => {
    const isDeposit = mov.type === "Depósito";
    const badgeClass = isDeposit ? "badge-success" : "badge-danger";
    const symbol = isDeposit ? "+" : "-";
    const tipoLegible = getTipoTransaccion(mov.type);

    const $li = $("<li>").addClass(
      "list-group-item d-flex justify-content-between align-items-center"
    ).html(`
            <div>
                <h6 class="mb-0">${mov.details}</h6>
                <div class="d-flex flex-column">
                    <small class="text-primary font-weight-bold">${tipoLegible}</small>
                    <small class="text-muted">${mov.date}</small>
                </div>
            </div>
            <span class="badge ${badgeClass} badge-pill">
                ${symbol} $${mov.amount.toLocaleString()}
            </span>
      `);

    $list.append($li);
  });
}

$(function () {
  mostrarUltimosMovimientos("todos");

  $("#filter-transactions").on("change", function () {
    const selectedFilter = $(this).val();
    mostrarUltimosMovimientos(selectedFilter);
  });

  $("#btn-back-menu").on("click", function () {
    window.location.href = "menu.html";
  });
});
