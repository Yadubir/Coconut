const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
const register = require('./Routes/Register');
const login = require('./Routes/Login');
const problemRoutes = require('./Routes/problemRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('hElLo CoCoNuT hErE !!!!!');
});

app.use('/api/auth', register);
app.use('/api/auth', login);
app.use('/api/problems', problemRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});