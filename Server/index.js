const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const projectManagerRoutes = require("./routes/projectManagerRoutes");
const developerRoutes = require("./routes/developerRoutes");
const PORT = process.env.PORT || 4500;

const corsOptions = {
    origin: [process.env.APPLICATION_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// connect Database
mongoose
    .connect(process.env.db)
    .then(() => {
        console.log(`DB connected successfully`);
    })
    .catch((err) => console.log(err));

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("hello");
});

app.use("/api/login", loginRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/project_manager", projectManagerRoutes);
app.use("/api/developer", developerRoutes);

// listen server
app.listen(PORT, () => {
    console.log(
        `Server listening on ${PORT} - cors enabled for ${process.env.APPLICATION_URL}`,
    );
});
app.get("/health", (req, res) => res.sendStatus(200));
