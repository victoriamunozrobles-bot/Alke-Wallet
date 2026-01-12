const newContactButton = document.querySelector("#new-contact");
const modalElement = document.querySelector("#staticBackdrop");
const contactForm = document.querySelector("#contact-form");
const contactSelect = document.querySelector("#contact-select");
const saveContactBtn = document.querySelector("#save-contact-btn");
const searchInput = document.querySelector("#searchContact");
const searchResults = document.querySelector("#search-results");
const transferModalEl = document.querySelector("#transferModal");
const confirmTransferBtn = document.querySelector("#confirm-transfer-btn");

const contactModal = new bootstrap.Modal(modalElement);
const transferModal = new bootstrap.Modal(transferModalEl);
let selectedContact = null;

const BALANCE_KEY = "wallet_total_balance";
const CONTACTS_KEY = "wallet_contacts";

function renderContacts() {
  // 1. Obtener datos (Si no hay nada, devuelve un array vacío)
  const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];

  // 2. Limpiar el select (manteniendo la primera opción por defecto)
  contactSelect.innerHTML =
    '<option value="" selected disabled>Seleccionar destinatario</option>';

  // 3. Crear las opciones dinámicamente
  contacts.forEach((contact) => {
    const option = document.createElement("option");
    option.value = contact.alias;
    option.textContent = `${contact.name} ${contact.lastname} - ${contact.bank}`;
    contactSelect.appendChild(option);
  });
}

function saveNewContact() {
  // Captura de valores
  const name = document.querySelector("#contact-name").value;
  const lastname = document.querySelector("#contact-lastname").value;
  const accNumber = document.querySelector("#contact-acc").value;
  const alias = document.querySelector("#contact-alias").value;
  const bank = document.querySelector("#contact-bank").value;

  // Validación simple
  if (!name || !lastname || !accNumber || !alias || !bank) {
    alert("Por favor, completa todos los campos del contacto.");
    return;
  }

  // Crear el objeto del nuevo contacto
  const newContact = {
    name: name,
    lastname: lastname,
    account: accNumber,
    alias: alias,
    bank: bank,
  };

  // Lógica de LocalStorage
  const currentContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  currentContacts.push(newContact);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(currentContacts));

  // Feedback al usuario y cierre
  alert("Contacto agregado con éxito.");
  contactForm.reset();
  contactModal.hide();
  renderContacts();
}

// --- LÓGICA DEL BUSCADOR ---
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];

  // Limpiar resultados anteriores
  searchResults.innerHTML = "";

  if (query.length > 0) {
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.lastname.toLowerCase().includes(query)
    );

    filtered.forEach((contact) => {
      const item = document.createElement("button");
      item.className = "list-group-item list-group-item-action";
      item.textContent = `${contact.name} ${contact.lastname}`;

      // Al hacer clic en un resultado, abrimos el modal de transferencia
      item.onclick = () => prepareTransfer(contact);
      searchResults.appendChild(item);
    });
  }
});

// --- LÓGICA DE TRANSFERENCIA ---
function prepareTransfer(contact) {
  selectedContact = contact;
  document.querySelector(
    "#recipient-name"
  ).textContent = `${contact.name} ${contact.lastname}`;
  document.querySelector("#recipient-alias").textContent = contact.alias;

  searchResults.innerHTML = "";
  searchInput.value = "";

  transferModal.show();
}

// Ejecuta la resta del saldo y guarda el cambio
function executeTransfer() {
  const amount = parseFloat(document.querySelector("#transfer-amount").value);
  const currentBalance = parseFloat(localStorage.getItem(BALANCE_KEY)) || 0;

  // 1. Validaciones
  if (isNaN(amount) || amount <= 0) {
    alert("Por favor, ingresa un monto válido.");
    return;
  }

  if (amount > currentBalance) {
    alert("Saldo insuficiente. Tu saldo actual es: $" + currentBalance);
    return;
  }

  // 2. Confirmación
  const confirmacion = confirm(
    `¿Estás seguro de enviar $${amount} a ${selectedContact.name}?`
  );

  if (confirmacion) {
    // 3. Operación matemática
    const newBalance = currentBalance - amount;

    // 4. Actualizar LocalStorage
    localStorage.setItem(BALANCE_KEY, newBalance);
    const newMovement = {
      type: "Transferencia",
      amount: amount,
      date: new Date().toLocaleString(),
      details: `Envío a ${selectedContact.name} ${selectedContact.lastname}`,
    };
    saveToHistory(newMovement);

    alert("¡Transferencia exitosa! El saldo ha sido actualizado.");
    transferModal.hide();
    window.location.href = "menu.html";
  }
}

function saveToHistory(movement) {
  const history = JSON.parse(localStorage.getItem("wallet_transactions")) || [];
  history.push(movement);
  localStorage.setItem("wallet_transactions", JSON.stringify(history));
}

newContactButton.addEventListener("click", () => {
  console.log("Abriendo formulario de contactos...");
  contactModal.show();
});

saveContactBtn.addEventListener("click", saveNewContact);
document.addEventListener("DOMContentLoaded", renderContacts);

confirmTransferBtn.addEventListener("click", executeTransfer);

// --- EVENTO PARA LA LISTA DESPLEGABLE ---

contactSelect.addEventListener("change", () => {
  const selectedAlias = contactSelect.value;

  if (!selectedAlias) return;

  const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY)) || [];
  const contactFound = contacts.find((c) => c.alias === selectedAlias);

  if (contactFound) {
    prepareTransfer(contactFound);

    contactSelect.selectedIndex = 0;
  }
});
