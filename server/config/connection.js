const express = require('express');
const app = express();
const PORT = 5555;

app.get('/', (req, res) => {
    res.send('connection established');
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})