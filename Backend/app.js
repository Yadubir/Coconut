const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hElLo CoCoNuT hErE !!!!!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});