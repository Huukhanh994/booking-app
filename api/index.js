const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const userRouter = require('./routes/users')
const roomRouter = require('./routes/rooms')
const hotelsRouter = require('./routes/hotels');
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config();
const port = process.env.PORT;
const app = express();

// middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json())

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connection MongoDB successfully!");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected MongoDB");
})

mongoose.connection.on('connected', () => {
    console.log("Connected MongoDB");
})
// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/rooms', roomRouter)
app.use('/api/v1/hotels', hotelsRouter)

// middleware error handle error message
app.use((err,req, res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


app.listen(port, () => {
    connect();
    console.log(`Connected to backend on port ${port}`);
})