const express = require('express');
const router = express.Router();

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

router.get('/api/person/first', (req, res) => {
    console.log("Hello in console");
    return;
})

// .params é para enviarmos junto de mais uma barra 

// http://localhost:8080/params/3           == /params/:teste?
// http://localhost:8080/params/4324&434    == /params/:teste?&:sla?

router.get('/params/:teste?&:sla?', (req, res) => { // "?" serve para o dado ser opcional
    const { teste } = req.params
    const { sla } = req.params
    res.send(`Número recebido: ${teste} & ${sla}`);
});

// .query é para enviarmos dados mais simples pela url 

// http://localhost:8080/query/?numero=3    == /query/:numero?

router.get('/query/:numero?', (req, res) => { // "?" serve para o dado ser opcional
    const { numero } = req.query
    res.send(`Número recebido: ${numero}`);
});

const people = [];

// POST
router.post('/api/person', (req, res) => {
    const { name, lastname, salary} = req.body;
    // const body = req.body;

    if(!name || !lastname || !salary)
        return res.status(400).send({ message: "Dados inválidos" })

    const person = {
        id: people.length,
        name: name,
        lastname: lastname,
        salary: salary
    }
    people.push(person);
    return res.status(201).send({ message: "Pessoa inserida com sucesso" });
});

// GET
router.get('/api/person', (req, res) => {
    return res.status(200).send({ data: people });
});


module.exports = router