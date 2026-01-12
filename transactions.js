const listContainer = document.querySelector("#transactions-list");

function renderTransactions() {
  const history = JSON.parse(localStorage.getItem("wallet_transactions")) || [];

  if (history.length === 0) {
    listContainer.innerHTML =
      '<li class="list-group-item text-center">Aún no hay movimientos.</li>';
    return;
  }

  listContainer.innerHTML = "";

  history.reverse().forEach((mov) => {
    const isDeposit = mov.type === "Depósito";

    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
            <div>
                <h6 class="mb-0">${mov.details}</h6>
                <small class="text-muted">${mov.date}</small>
            </div>
            <span class="badge ${
              isDeposit ? "bg-success" : "bg-danger"
            } rounded-pill">
                ${isDeposit ? "+" : "-"} $${mov.amount.toLocaleString()}
            </span>
        `;
    listContainer.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderTransactions);
