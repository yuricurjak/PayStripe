require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);

const appstripe = module.exports = {};

appstripe.createCustomer = (name, email, description) => {
    return new Promise((resolve, reject) =>{
        stripe.customers.create({
            description: description,
            email: email,
            name: name
        }, function (err, customer) {
            if(err){
                reject(console.log('error send to Stripe: ', err));
            }
            else{
                resolve(console.log('customer', customer));
            }
        });
    });
};

appstripe.createPaymentMethod = (cardNumber, expMonth, expYear, cvcNumber) =>{
    return new Promise((resolve, reject) =>{
        stripe.paymentMethods.create({
            type: 'card',
            card:{
                number: cardNumber,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvcNumber
            }
        }, function (err, token) {
            if(err){
                reject(console.log('erro send to Stripe paymentMethods: ', err));
            }
            else{
                resolve(token.id);
            }

        });
    });
};

appstripe.createPaymentIntent = (amountValue, description, idPayment, email) =>{
    return new Promise((resolve, reject) =>{
        stripe.paymentIntents.create({
            amount: amountValue,
            currency: 'brl',
            payment_method_types: ['card'],
            description: description,
            confirm: true,
            payment_method: idPayment,
            receipt_email: email
        }, function(err, paymentIntent) {
            if(err){
                reject(console.log('erro send to Stripe PaymentIntent: ', err));
            }
            else{
                resolve(paymentIntent);
            }
        });
    });
};
