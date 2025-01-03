const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./Config/db');
const register = require('./Routes/Register');
const login = require('./Routes/Login');
const problemRoutes = require('./Routes/problemRoutes');
const logout = require('./Routes/Logout');


dotenv.config();
connectDB();

const app = express();
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('hElLo CoCoNuT hErE !!!!!');
});

app.use('/api/auth', register);
app.use('/api/auth', login);
app.use('/api/problems', problemRoutes);
app.use('/api/auth', logout);


const PORT = process.env.PORT || 3000;
app.use(express.json()); // parse incoming req.body
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});