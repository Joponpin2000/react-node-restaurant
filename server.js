const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./database/database');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const AllProductsRoutes = require('./routes/AllProducts');
const paymentRoutes = require('./routes/payment');

const paymentController = require('./controllers/payment');

app.use(bodyParser.urlencoded({
    extended: true,
})
);

// app.use(cors({
//     origin: [
//         `http://localhost:3000`,
//     ],
//     credentials: true
// })
// );

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/products', AllProductsRoutes);
app.use(express.static('uploads'));
app.use('/api/paystack', paymentRoutes);


app.use(express.static(path.join(__dirname, './mern-todo-app/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './mern-todo-app/build', "index.html"));
});

// MONGODB_URL = "mongodb://localhost:27017";
// MONGODB_URL = "mongodb+srv://joponpin:joseph568742@restaurantcluster.dovg2.mongodb.net/restaurant?retryWrites=true&w=majority"



app.get('/payment-success/:id', paymentController.receipt);


connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));