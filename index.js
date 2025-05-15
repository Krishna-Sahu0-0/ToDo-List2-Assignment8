const express = require ("express");
const bodyParser = require ("body-parser");
var app = express ();
app.set ("view engine", "ejs");
app.use (express.urlencoded ({extended: true}));
app.use (express.static ("public"));

require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const tryschema = new mongoose.Schema ({
    name: String,
});
const item = mongoose.model ("task", tryschema);
app.get("/", async function (req, res) {
    try {
        const foundItems = await item.find({});
        res.render("list", { dayej: foundItems });
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while fetching items.");
    }
});
app.post("/", function (req, res) {
    const itemName = req.body.ele1;
    const todo4 = new item ({
        name: itemName
    });
    todo4.save ();
    res.redirect ("/");
});
app.post("/delete", async function (req, res) {
    const checked = req.body.checkbox1;
    try {
        await item.findByIdAndDelete(checked);
        console.log("Deleted successfully");
        res.redirect("/");
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while deleting the item.");
    }
});
app.listen ("8000", function () {
    console.log ("Server is running on port 8000");
});
