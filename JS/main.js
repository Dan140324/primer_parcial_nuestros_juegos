const formulario = document.getElementById("formulario_contacto");
const mensajeExito = document.getElementById("mensaje_exito");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;

    if (nombre === "" || correo === "" || mensaje === "") {
        mensajeExito.textContent = "Por favor completa todos los campos.";
        mensajeExito.style.color = "red";
        return;
    }

    mensajeExito.textContent = "¡Gracias por tu aporte!";
    mensajeExito.style.color = "green";
    formulario.reset();
});