const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./database/database');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const ordersRoutes = require('./routes/orders');
const productRoutes = require('./routes/product');
const AllProductsRoutes = require('./routes/AllProducts');
const paymentRoutes = require('./routes/payment');
const searchRoutes = require('./routes/search');
const contactRoutes = require('./routes/contact');
const https = require('https');
const fs = require('fs');

const paymentController = require('./controllers/payment');

app.use(bodyParser.urlencoded({
    extended: true,
})
);

// app.use(cors({
//     origin: [
//         `https://pizzards.netlify.app`,
//         // `http://localhost:3000`,
//     ],
//     credentials: true
// })
// );

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/product', productRoutes);
app.use('/api/products', AllProductsRoutes);
app.use('/api/paystack', paymentRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/contact', contactRoutes);
app.use(express.static('uploads'));

app.get('/', (req, res) => {
    console.log("Pizzards api default endpoint")
    res.json({ message: "Pizzards api default endpoint" })
});

// app.use(express.static(path.join(__dirname, './mern-todo-app/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './mern-todo-app/build', "index.html"));
// });


app.get('/payment-success/:id', paymentController.receipt);


connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

// const options = {
//     key: fs.readFileSync('key.pem', 'utf8'),
//     cert: fs.readFileSync('cert.pem', 'utf8')
// };

// https.createServer(options, app).listen(PORT, function (error) {
//     if (error) return console.error(error.message);
//     console.log(`Server running on port ${PORT}`);
// });