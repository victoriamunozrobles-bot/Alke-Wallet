console.log("Login funciona");

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

function isEmailValid(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(document).ready(function () {
  $("#login__form").on("submit", function (event) {
    event.preventDefault();

    const emailValue = $("#exampleInputEmail1").val();
    const passwordValue = $("#exampleInputPassword1").val();

    if (isEmailValid(emailValue) && passwordValue.length >= 8) {
      showBootstrapAlert(
        "¡Listo! Has iniciado sesión. Redirigiendo...",
        "success"
      );

      setTimeout(() => {
        window.location.href = "./pages/menu.html";
      }, 1500);
    } else {
      showBootstrapAlert(
        "Credenciales inválidas. Revisa el correo y que la clave tenga al menos 8 caracteres.",
        "danger"
      );

      $("#exampleInputPassword1").val("");
    }
  });
});
