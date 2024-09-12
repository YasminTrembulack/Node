const express = require('express');
const router = express.Router();

router.
    post('/', (req, res) => {
        console.log(req.body);

    })

// // .params é para enviarmos junto de mais uma barra 

// // http://localhost:8080/test/params/3           == /test/params/:teste?
// // http://localhost:8080/test/params/4324&434    == /test/params/:teste?&:sla?

// router.get('/test/params/:teste?&:sla?', (req, res) => { // "?" serve para o dado ser opcional
//     const { teste } = req.params
//     const { sla } = req.params
//     res.send(`Número recebido: ${teste} & ${sla}`);
// });

// // .query é para enviarmos dados mais simples pela url 

// // http://localhost:8080/test/query/?numero=3    == /test/query/:numero?

// router.get('/test/query/:numero?', (req, res) => { // "?" serve para o dado ser opcional
//     const { numero } = req.query
//     res.send(`Número recebido: ${numero}`);
// });

module.exports = router