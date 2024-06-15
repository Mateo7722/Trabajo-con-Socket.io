let socket = io();

const mensajes = document.querySelector("#mensajes");
const inputs = document.querySelector(".input-wrapper");
const autorInput = document.querySelector("#autorInput");
const contenidoInput = document.querySelector("#contenidoInput");

//Generador de colores aleatorios del 1 al 5
const colores = ["#ffc09f", "#ffee93", "#fcf5c7", "#a0ced9", "#adf7b6"];

const numerosAleatorio = () => {
  const num = Math.floor(Math.random() * 5);
  return colores[num];
};

//Funcion para mostrar los mensajes en pantalla
const mostrarMensajes = (mensajes) => {
  //Vaciamos el body
  document.body.innerHTML = "";

  //Recorremos los mensajes y les creamos un div con los parrafos
  mensajes.map((mensaje) => {
    const divMensaje = document.createElement("div");

    divMensaje.setAttribute("class", "mensaje");
    divMensaje.style.background = mensaje.color;
    divMensaje.innerHTML = `<p id="autor">${mensaje.autor}: </p>
                            <p id="contenido">${mensaje.contenido}</p>`;

    document.body.appendChild(divMensaje);
    document.body.appendChild(inputs);
  });
};

//Enviamos mensaje
const enviarMensaje = () => {
  //Verifica que los campos no esten vacios
  if (autorInput.value == "" || contenidoInput.value == "") {
    alert("Complete ambos campos");
    return false;
  }

  //Crea un objeto mensaje
  const mensaje = {
    autor: autorInput.value,
    contenido: contenidoInput.value,
    color: numerosAleatorio(),
  };

  //Vacio los inputs y envia el mensaje
  autorInput.value = "";
  contenidoInput.value = "";

  socket.emit("nuevo-mensaje", mensaje);

  return false;
};

socket.on("mensajes", (mensajes) => {
  mostrarMensajes(mensajes);
});
