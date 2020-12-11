const request = require('request');
const Payment = require('../models/Payment');
const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.pay = async (req, res) => {
    try {

        //axios Set up
        const Axios = axios.create({
            headers: {
                authorization: 'Bearer ' + secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        });

        const form = _.pick(req.body, ['amount', 'email', 'name']);
        form.metadata = {
            full_name: form.name
        }
        form.amount *= 100;

        Axios.post('https://api.paystack.co/transaction/initialize', form)
            .then((response) => {
                const paystackResponse = response.data;
                const auth_url = paystackResponse.data.authorization_url;
                return res.status(200).json({ url: auth_url });
            })
            .catch((error) => {

                return res.status(500).json({
                    errorMessage: 'Error occured try again later'
                })
            })

    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}

exports.verify = async (req, res) => {
    try {
        const ref = req.query.ref;

        const url = 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref);

        //axios Set up
        const Axios = axios.create({
            headers: {
                authorization: 'Bearer ' + secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        });

        Axios.get(url)
            .then((response) => {
                let { id, reference, amount, customer } = response.data.data;
                const { email } = customer;
                const fullName = email.split("@")[0];
                amount = (amount / 100) / 400;
                const newPayment = new Payment({ fullName, amount, reference });
                newPayment.save()
                    .then((payment) => {
                        if (!payment) {
                            return res.redirect('/error');
                        }
                        return res.status(200).json({ url: "/payment-success/" + reference });
                    })
                    .catch((e) => {
                        console.log('database')
                        res.redirect('/error');
                    })
            })
            .catch((error) => {
                return res.status(500).json({
                    errorMessage: 'Error occured try again later'
                })
            })


    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}


exports.receipt = async (req, res) => {

    try {
        const userRef = req.params.id;

        await Payment.findOne({ reference: userRef }, (err, user) => {

            return res.status(200).json({ user: user });
        });

    } catch (err) {
        return res.status(500).json({
            errorMessage: 'Please try again later'
        })
    }
}