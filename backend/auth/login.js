const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const users = [
    { username: "admin", password: bcrypt.hashSync("admin123", 10), role: "admin" },
    { username: "player", password: bcrypt.hashSync("player123", 10), role: "player" },
];

router.post("/", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send("Credenciais inválidas");
    }

    const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    res.json({ token });
});

module.exports = router;
