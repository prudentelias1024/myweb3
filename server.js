const express = require("express");
const app = express();
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/build'));
app.get('/', (req, res) => {
    
    res.sendFile(__dirname + '/src/index.html')
})
app.listen(5000,() => {
console.log('Server running on Port 5000')
})