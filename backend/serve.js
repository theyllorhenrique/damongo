const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const { verifyToken } = require("./auth/authmiddleware");
const socketHandler = require("./socket");

const app = express();
app.use(cors());
app.use(express.json());

// Rota pública
app.use("/api/login", require("./auth/login"));

// Protegida
app.get("/api/admin", verifyToken, (req, res) => {
    if (req.user.role === "admin") {
        res.send("Você é admin!");
    } else {
        res.status(403).send("Acesso negado.");
    }
});

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

socketHandler(io); // define os eventos de jogo

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor no ar: ${PORT}`));
