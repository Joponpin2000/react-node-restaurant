const Contact = require('../models/Contact');

exports.create = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        let newContact = new Contact();
        newContact.name = name;
        newContact.email = email;
        newContact.message = message;

        newContact = await newContact.save();

        return res.status(200).json({
            successMessage: `Message sent.`,
        })
    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}