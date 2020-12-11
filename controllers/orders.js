const Orders = require('../models/Payment');

exports.readAll = async (req, res) => {
    try {

        const orders = await Orders.find({});

        res.status(200).json({
            orders,
        });
    } catch (err) {
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

exports.delete = async (req, res) => {
    id = req.params.id;
    try {
        const deleteOrder = await Orders.findById(req.params.id)
        if (deleteOrder) {
            await deleteOrder.remove((err, order) => {
                return res.json({
                    successMessage: 'Product Deleted'
                });
            });
        }
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}