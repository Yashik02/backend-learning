const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { json } = require('stream/consumers');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'css')));
let i = 1;



app.use((req, res, next) => {
    i++;
    next();
});



app.get("/", (req, res) => {
    res.send("connection is good")

});



app.get("/home", (req, res) => {
    res.render("home");

});


app.get("/ig/:username", (req, res) => {
    const instaData= require('./data.json');
    const {username} = req.params;
    if(instaData[username] != undefined) {
        res.render("insta", instaData[username]);
    } else {
        res.render("error");
    }
});
app.get("/ig/", (req, res) => {
    res.send("cannot search empty username");
});


app.get("/profile/:username", (req, res) => {
    const followers = ["dokja", "junghyuk", "seolhwa", "sooyoung"];
    const {username} = req.params;
    res.render("profile", {username, reqID : i, followers});
});

app.get("/profile/", (req, res) => {
    res.send("cannot search empty username");
});


app.listen(port, () => {
    console.log(`server has started for port : ${port}`);
});
