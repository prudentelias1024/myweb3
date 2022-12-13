const express = require("express");
const app = express();

app.get('/', (req, res) => {res.render('src/index.ejs')})
app.set('view engine', "ejs");
app.listen(5000,() => {
console.log('Server running on Port 5000')
})