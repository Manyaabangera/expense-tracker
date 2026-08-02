const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("Backend is working");
});

app.get("/login", (req, res) => {
    res.send("Login Page");
});

app.get("/register", (req, res) => {
    res.send("Register Page");
});

app.get("/expenses", (req, res) => {
    res.send("All Expenses");
});



app.listen(5000 ,() => {
    console.log("Server started");
});