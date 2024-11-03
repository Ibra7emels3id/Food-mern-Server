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
const port = 3000



// Connect to the server MongoDB 
ConnectDb()

// dotenv;
require('dotenv').config();

// Server configuration settings for express
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://food-mern-nfam.onrender.com',
    credentials: true
}))
app.use(express())
app.use(express.json())

// Serve static files from the 'public' directory
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

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


