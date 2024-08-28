const Person = require('../models/Person');

class PersonController {
    static async create(req, res) {
        const { name, lastname, salary } = req.body;

        if (!name || !lastname || !salary)
            return res.status(400).send({ message: "Dados inválidos" })

        const person = {
            name: name,
            lastname: lastname,
            salary: salary
        }
        try {
            const result = await Person.create(person);
            return res.status(201).send({
                message: "Pessoa inserida com sucesso",
                body: result
            });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

    static async getAll(req, res) {
        try {
            const result = await Person.find();
            return res.status(200).send({
                body: result
            });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    }

    static async getOne(req, res) {
        const { id } = req.params;
        try {
            const result = await Person.findById(id);
            return res.status(200).send({
                body: result
            });
        } catch (error) {
            return res.status(500).send({
                message: "Pessoa não encontrada",
                error: error
            });
        }
    }
}

module.exports = PersonController;