const express = require('express');
const app = express();
const port = 3000;

app.get('/getVoltage', (req, res) => {
    res.send('3,3V');
});

app.get('/getTemperature', (req, res) => {
    res.send('28,5°C');
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;