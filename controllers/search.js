const Product = require('../models/Product');

exports.read = async (req, res) => {
    let query = req.query.q.toLowerCase();
    try {
        let dataBank = await Product.find({});
        let products = dataBank.filter(product =>
            new RegExp(`^${query}`).test(product.productName.toLowerCase())
        );

        return res.status(200).json({
            products
        });
    } catch (err) {
        res.status(500).json({
            errorMessage: 'Please try again later'
        });
    }

}
