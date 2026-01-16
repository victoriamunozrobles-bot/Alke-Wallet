const BALANCE_KEY = "wallet_total_balance";
const CONTACTS_KEY = "wallet_contacts";

function showAlert(message, type = "info") {
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

function isAccountValid(account) {
  const regex = /^[0-9]+$/;
  return regex.test(account) && account.length >= 10;
}

function renderContacts() {
  const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  $("#contact-select").html(
    '<option value="" selected disabled>Seleccionar destinatario</option>'
  );

  $.each(contacts, function (i, contact) {
    $("<option>", {
      value: contact.alias,
      text: `${contact.name} ${contact.lastname} - ${contact.bank}`,
    }).appendTo("#contact-select");
  });
}

function saveNewContact() {
  const newContact = {
    name: $("#contact-name").val().trim(),
    lastname: $("#contact-lastname").val().trim(),
    account: $("#contact-acc").val().trim(),
    alias: $("#contact-alias").val().trim(),
    bank: $("#contact-bank").val().trim(),
  };

  if (Object.values(newContact).some((val) => val === "")) {
    showAlert("Todos los campos son obligatorios.", "warning");
    return;
  }

  if (!isAccountValid(newContact.account)) {
    showAlert(
      "El CBU/Cuenta debe contener solo números (mínimo 10).",
      "danger"
    );
    $("#contact-acc").addClass("is-invalid");
    return;
  }

  const currentContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  currentContacts.push(newContact);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(currentContacts));

  showAlert("Contacto guardado con éxito.", "success");
  $("#contact-form")[0].reset();
  $("#staticBackdrop").modal("hide");
  $("#save-contact-btn").prop("disabled", true);
  renderContacts();
}

$(document).on("input", "#searchContact", function () {
  const query = $(this).val().toLowerCase();
  const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  const $results = $("#search-results");

  $results.empty();

  if (query.length > 0) {
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.lastname.toLowerCase().includes(query)
    );

    $.each(filtered, function (i, contact) {
      $("<button>")
        .addClass("list-group-item list-group-item-action")
        .text(`${contact.name} ${contact.lastname}`)
        .on("click", () => prepareTransfer(contact))
        .appendTo($results);
    });
  }
});

function prepareTransfer(contact) {
  $("#transferModal").data("selectedContact", contact);
  $("#recipient-name").text(`${contact.name} ${contact.lastname}`);
  $("#recipient-alias").text(contact.alias);
  $("#search-results").empty();
  $("#searchContact").val("");
  $("#transferModal").modal("show");
}

function executeTransfer() {
  const amountStr = $("#transfer-amount").val();
  const amount = parseFloat(amountStr);
  const currentBalance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;
  const selectedContact = $("#transferModal").data("selectedContact");

  if (!selectedContact) {
    showAlert("Debe seleccionar un destinatario.", "danger");
    return;
  }

  if (amountStr === "" || isNaN(amount) || amount <= 0) {
    showAlert("Por favor, ingresa un monto válido.", "warning");
    $("#transfer-amount").addClass("is-invalid");
    return;
  }

  if (amount > currentBalance) {
    showAlert(
      `Saldo insuficiente. Tu saldo es: $${currentBalance.toLocaleString()}`,
      "danger"
    );
    return;
  }

  if (
    confirm(
      `¿Estás seguro de enviar $${amount.toLocaleString()} a ${
        selectedContact.name
      }?`
    )
  ) {
    const newBalance = currentBalance - amount;
    localStorage.setItem(BALANCE_KEY, newBalance);

    const newMovement = {
      type: "Transferencia",
      amount: amount,
      date: new Date().toLocaleString(),
      details: `Envío a ${selectedContact.name} ${selectedContact.lastname}`,
    };

    saveToHistory(newMovement);

    $("#transfer-confirmation").html(`
      <div class="card border-success mt-4">
        <div class="card-body text-success text-center">
          <h5 class="card-title">¡Envío Realizado!</h5>
          <p class="card-text">Se han transferido <strong>$${amount.toLocaleString()}</strong> con éxito a <strong>${
      selectedContact.name
    } ${selectedContact.lastname}</strong>.</p>
        </div>
      </div>
    `);

    showAlert("¡Transferencia exitosa!", "success");
    $("#transferModal").modal("hide");

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 2500);
  }
}

function saveToHistory(movement) {
  const history = JSON.parse(localStorage.getItem("wallet_transactions")) || [];
  history.push(movement);
  localStorage.setItem("wallet_transactions", JSON.stringify(history));
}

$(function () {
  renderContacts();

  const $contactInputs = $(
    "#contact-name, #contact-lastname, #contact-acc, #contact-alias, #contact-bank"
  );
  const $saveBtn = $("#save-contact-btn");

  $saveBtn.prop("disabled", true);

  $contactInputs.on("input change", function () {
    let hasEmpty = false;
    $contactInputs.each(function () {
      if ($(this).val().trim() === "") {
        hasEmpty = true;
      }
    });
    $saveBtn.prop("disabled", hasEmpty);
  });

  $("#new-contact").on("click", function () {
    $("#staticBackdrop").modal("show");
  });

  $("#save-contact-btn").on("click", saveNewContact);
  $("#confirm-transfer-btn").on("click", executeTransfer);

  $("#contact-select").on("change", function () {
    const selectedAlias = $(this).val();
    if (!selectedAlias) return;

    const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
    const contactFound = contacts.find((c) => c.alias === selectedAlias);

    if (contactFound) {
      prepareTransfer(contactFound);
      $(this).prop("selectedIndex", 0);
    }
  });

  $("input").on("input", function () {
    $(this).removeClass("is-invalid is-valid");
  });

  $("#btn-back-menu").on("click", function () {
    window.location.href = "menu.html";
  });
});

$(function () {
  $("#btn-logout-nav").on("click", function () {
    window.location.href = "../index.html";
  });
});
