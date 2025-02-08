const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load .env variables BEFORE using them

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req, res)=>{
    res.send("<h1>Hello world</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
