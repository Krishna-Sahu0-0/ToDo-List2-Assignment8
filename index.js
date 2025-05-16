const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

const Task = mongoose.model("Task", new mongoose.Schema({ name: String }));

app.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.render("list", { dayej: tasks });
    } catch (err) {
        res.status(500).send("Error fetching tasks.");
    }
});

app.post("/", async (req, res) => {
    const name = req.body.ele1?.trim();
    if (!name) return res.redirect("/");
    await Task.create({ name });
    res.redirect("/");
});

app.delete("/delete/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted");
    } catch {
        res.status(500).send("Error deleting task.");
    }
});

app.put("/edit/:id", async (req, res) => {
    const name = req.body.updatedName?.trim();
    if (!name) return res.status(400).send("Name required.");
    try {
        await Task.findByIdAndUpdate(req.params.id, { name });
        res.status(200).send("Updated");
    } catch {
        res.status(500).send("Error updating task.");
    }
});

app.listen(8000, () => console.log("Server running on port 8000"));
