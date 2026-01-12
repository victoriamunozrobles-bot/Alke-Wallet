function isEmailValid(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$(document).ready(function () {
  $("#login__form").on("submit", function (event) {
    event.preventDefault();
    console.log("hiciste click");

    const emailValue = $("#exampleInputEmail1").val();
    const passwordValue = $("#exampleInputPassword1").val();
    if (isEmailValid(emailValue) && passwordValue.length >= 8) {
      alert("¡Listo! Has iniciado sesión. Explora tu cuenta");
      window.location.href = "../HTML/menu.html";
    } else {
      alert(
        "Credenciales inválidas. Revisa que el correo sea correcto y la clave tenga al menos 8 caracteres."
      );
      $("#loginInputPassword").val("");
    }
  });
});
