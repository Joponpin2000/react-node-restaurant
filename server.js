const express = require('express');
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

// middlewares
app.use(bodyParser.urlencoded({
    extended: true,
})
);

app.use(cors({
    origin: [
        `http://localhost:3000`,
    ],
    credentials: true
})
);

app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'));
// });

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/products', AllProductsRoutes);
app.use(express.static('uploads'));
app.use('/api/paystack', paymentRoutes);

app.get('/payment-success/:id', paymentController.receipt);


connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("Server is running on Port: " + PORT));