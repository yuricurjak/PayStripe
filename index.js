const routes = require('./app/routes');
require('dotenv').config();
const port = process.env.port;

routes.listen(port, () =>{
    console.log('Servidor rodando na porta ' + port);
});