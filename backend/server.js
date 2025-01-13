const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;

require('dotenv').config();
const app = express();
connectDB();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/registration', registrationRoutes);
app.use('/api/team', teamRoutes);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})

module.exports = app;