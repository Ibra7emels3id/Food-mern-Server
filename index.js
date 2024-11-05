const express = require('express')
const app = express()
const cors = require('cors')
const ConnectDb = require('./Connectdb/Mongodb')
const path = require('path')
const UserRouterClint = require('./Router/UserRouter')
const ProductRouterClint = require('./Router/ProductRoter')
const CarRouterClint = require('./Router/CardRouter')
const CategoryRouterClint = require('./Router/CategoryRouter')
const PaymentRouterClint = require('./Router/PaymentRouter')
const ReviewRouterClint = require('./Router/ReviewRouter')
const ConnectCloudinary = require('./Config/ConnectCloudinary')
const port = 3000



// Connect to the server MongoDB 
ConnectDb()

// 
ConnectCloudinary()

// dotenv;
require('dotenv').config();

// Server configuration settings for express
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://food-mern-nfam.onrender.com',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept', 'X-Custom-Header'],
    credentials: true
}))
app.use(express())
app.use(express.json())

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/Uploads', express.static(path.join(__dirname, 'public/Uploads')));


// 
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});



// Router 
app.use('/api', UserRouterClint)
app.use('/api', ProductRouterClint)
app.use('/api', CarRouterClint)
app.use('/api', CategoryRouterClint)
app.use('/api', PaymentRouterClint)
app.use('/api', ReviewRouterClint)



// app Start Server
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



