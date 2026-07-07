const express = require('express');
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

 

// works for any request, that matches the path, if no path then it runs for every request like a middle ware
let i = 1;
app.use((req, res, next) => { 
    console.log("request recieved " + i++);
    next(); //move to the next function
});

// Tell Express to serve everything inside the "public" folder
//app.use(express.static('./simon-says'));

// this is used to make code into a server
app.listen(port, () => {
    console.log("app is listening at port : " + port);
});

// GET, POST, PUT, DELETE
// root example
app.get("/", (req, res) => {
    //send response back
    res.send(`the get request was recieved the response is OK`);
});

//for specific custom path parameters
app.get("/:username/:id", (req, res) => {
    let {username, id} = req.params;
    //send response back
    res.send(`the get request was recieved the response is OK ${username} with id ${id}`);
});

//for specific custom queries
app.get("/search", (req, res) => {
    let queries = JSON.stringify(req.query);
    //send response back
    res.send(`the get request was recieved on the search path the response is OK the quesry was - ${queries}`);
});

//nodemon is another library used to restart server on changes