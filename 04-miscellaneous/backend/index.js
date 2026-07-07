const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.send("connections stable");
});

app.get("/register", (req, res) => {
    res.send("GET response");
});

app.post("/register", (req, res) => {
    let {name, age} = req.body;
    let s = `POST respose to ${name} of age ${age}`;
    res.send(s);
});


app.listen(port, () => {
    console.log(`listening to port at ${port}`);
});