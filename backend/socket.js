module.exports = function(io) {
    const players = {};

    io.on("connection", (socket) => {
        console.log("Novo jogador conectado:", socket.id);

        socket.on("register", ({ username, role }) => {
            players[socket.id] = { username, role };
            io.emit("playersUpdate", players);
        });

        socket.on("move", (data) => {
            // atualiza posição do jogador
            if (players[socket.id]) {
                players[socket.id].position = data;
                io.emit("playersUpdate", players);
            }
        });

        socket.on("disconnect", () => {
            delete players[socket.id];
            io.emit("playersUpdate", players);
        });
    });
};
