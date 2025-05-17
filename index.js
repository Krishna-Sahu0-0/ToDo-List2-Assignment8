const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Task = mongoose.model("Task", new mongoose.Schema({
    name: String,
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" }
}));

app.get("/", async (req, res) => {
    try {
        const filter = req.query.priority;
        const query = filter ? { priority: filter } : {};
        const tasks = await Task.find(query);
        res.render("list", { dayej: tasks, filter });
    } catch (err) {
        res.status(500).send("Error fetching tasks.");
    }
});

app.post("/", async (req, res) => {
    const name = req.body.ele1?.trim();
    const priority = req.body.priority || "Medium";
    if (!name) return res.redirect("/");
    await Task.create({ name, priority });
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
    const priority = req.body.updatedPriority;
    if (!name) return res.status(400).send("Name required.");
    try {
        await Task.findByIdAndUpdate(req.params.id, { name, priority });
        res.status(200).send("Updated");
    } catch {
        res.status(500).send("Error updating task.");
    }
});

app.listen(8000, () => console.log("Server running on port 8000"));
