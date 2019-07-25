const express = require('express');
const routes = express();
const bodyParser = require('body-parser');
const appstripe = require('./appstripe');
routes.use(bodyParser.json());

// routes.post('/createCustomer', (req, res) =>{
//     let teste = appstripe.createCustomer(req.body.name,req.body.email, req.body.description);
//     console.log(teste);
//     res.status(200).send('Funcionou');
// });

routes.post('/', async (req, res) =>{
    try {
        let idPayment = await appstripe.createPaymentMethod(req.body.cardNumber, req.body.expMonth, req.body.expYear, req.body.cvcNumber);
        let charge = await appstripe.createPaymentIntent(req.body.amountValue, req.body.description, idPayment, req.body.email);
        console.log(charge);
        console.log('Request received');
        res.status(200).send('Request received successfully');
    }catch (e) {
        console.log(e);
        res.status(404).send(e);
    }
});
module.exports = routes;


