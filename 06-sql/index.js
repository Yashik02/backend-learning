const { faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");
const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const path = require('path');
require("dotenv").config({path : path.join(__dirname, ".env")});

function getUser() {
    return [
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ]
};

// we know about 4 ways to use sql database for now - mysql workbench, javascript file, CLI, .sql files

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit: 0
});

let reqID = 1;

// middleware configs
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method')); // RESTful apis


// view engine config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// request tracker (not necessary, just for myself)
app.use((req, res, next) => {
    console.log(`server processing request no ${reqID++}`);
    next();
});

// routes
app.get("/", async (req, res) => {
    try{
        let [result] = await pool.query("SELECT count(username) AS count FROM user");
        let totalUser = result[0].count;
        res.send(`Total Users : ${totalUser}`)
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});

app.get("/user", async (req, res) => {
    try{
        let [result] = await pool.query("SELECT id, username , email FROM user");
        res.render("users", {users : result});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});

app.post("/user", async (req, res) => {
    try{
        let {username, email, password} = req.body;
        let data = [username, email, password];
        let [result] = await pool.query("INSERT INTO user (username, email, password) VALUES (?, ?, ?) ", data);
        res.redirect("/user");
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});

app.get("/user/new", (req, res) => {
    res.render("new");
});

app.get("/user/:id", async (req, res) => {
    try{
        let {id} = req.params;
        let [result] = await pool.query(`SELECT id, username , email FROM user WHERE id = ?`, [id]);
        res.render("show", {user : result[0]});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});

app.get("/user/:id/edit", async (req, res) => {
    try{
        let {id} = req.params;
        let [result] = await pool.query(`SELECT id, username , email FROM user WHERE id = ?`, [id]);
        res.render("edit", {user : result[0]});
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});

app.patch("/user/:id", async (req, res) => {
    try {
        let {id} = req.params;
        let {newUsername} = req.body;
        let [result] = await pool.query(`UPDATE user SET USERNAME = ? WHERE id = ?`, [newUsername, id]);
        res.redirect("/user");
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        let {id}= req.params;
        let q = "DELETE FROM user WHERE id = ?";
        let result = await pool.query(q, [id]);
        res.redirect("/user");
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send(`Internal server error`);
    }
});


// listener
app.listen(port, () => {
    console.log(`server is live on ${port}`);
});





// fake data - made using the mysql2 old callback way. the rest of the code uses mysql2/promise

// let data = [];

// for(let i = 0; i < 100; i++) {
//     data.push(getUser());
// }

// let q = `INSERT INTO user (username, email, password) VALUES ?`;
// let user = [
//     ["yashik", "zeroyashik@gmail.com", "Demo-Password"],
//     ["dhruv", "dhryv@gmail.com", "Demo-Password1"],
//     ["sunita", "sunitabandhu8@gmail.com", "Demo-Password2"]
// ]

// connection.query(q, [data], (err, result, fields) => {
//     if (err) {
//         console.log("Error executing query:", err);
//     } else {
//         console.log(result); 
//     }

//     connection.end(); 
// });