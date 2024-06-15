const express = require("express");

app = express();
http = require("http").Server(app);
io = require("socket.io")(http);

const port = process.env.PORT || 3000;

let mensajes = [
  { autor: "Admin", contenido: "Inicia una conversación", color: "#c7ceea" },
];

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

http.listen(port, () => {
  console.log(`Server funcionando en el puerto ${port}`);
});

io.on("connection", (socket) => {
  socket.emit("mensajes", mensajes);

  socket.on("nuevo-mensaje", (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});
