let socket;

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://seu-backend-na-render.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!data.token) return alert("Falha no login");

    const payload = JSON.parse(atob(data.token.split('.')[1]));
    const role = payload.role;

    socket = io("https://seu-backend-na-render.com");
    socket.emit("register", { username, role });

    socket.on("playersUpdate", (players) => {
        document.getElementById("log").textContent = JSON.stringify(players, null, 2);
    });
}
