const express = require('express');
const app = express();
const methodOverride = require('method-override');
const crypto = require('crypto');
const port = 3000;
const path = require('path');

let reqID = 1;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log("request number : " + reqID++);
    next();
});


let posts = [
    {
        username: "yashik",
        content: "this is a test post1",
        id: crypto.randomUUID()
    },
    {
        username: "dhruv",
        content: "this is a test post2",
        id: crypto.randomUUID()
    },
    {
        username: "sunny",
        content: "this is a test post3",
        id: crypto.randomUUID()
    }
];

app.get("/", (req, res) => {
    res.send(`connection OK at port: ${port}`);
});

app.get("/posts", (req, res) => {
    res.render("index", {posts});
});

app.post("/posts", (req, res) => {
    let data = req.body;
    data.id = crypto.randomUUID();
    posts.push(data);
    res.redirect(302, "/posts");
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    const matchedPost = posts.find((p) => id === p.id );

    if(!matchedPost) {
        res.status(404).send("post not found");
    }

    res.render("show", {post : matchedPost});
});

app.patch("/posts/:id", (req, res) => {
    let {content} = req.body;
    let {id} = req.params;
    const matchedPost = posts.find((p) => id === p.id );

    if(!matchedPost) {
        res.status(404).send("post not found");
    }

    matchedPost.content = content;

    res.render("show", {post : matchedPost});
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    const matchedPostIDX = posts.findIndex((p) => id === p.id );

    if(matchedPostIDX < 0) {
        res.status(404).send("post not found");
    } else {
        posts.splice(matchedPostIDX, 1);
    }
    res.redirect(302, "/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    const matchedPost = posts.find((p) => id === p.id );

    if(!matchedPost) {
        res.status(404).send("post not found");
    }

    res.render("edit", {post : matchedPost});
});


app.listen(port, () => {
    console.log("server is live");
});