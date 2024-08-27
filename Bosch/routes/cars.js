const express = require('express');
const { all } = require('./person');
const router = express.Router();

const allCars = [];

router.get('/api/cars', (req, res) => {
    return res.send({ data: allCars });
})

router.post('/api/cars', (req, res) => {
    const { brand, model, year, color, doors, plate } = req.body;

    if(!brand || !model || !year || !color || !doors || !plate)
        return res.status(400).send({ message: "Dados inválidos" })

    const car = { 
        id: allCars.length, 
        brand: brand, 
        model: model, 
        year: year, 
        color: color, 
        number_of_doors: doors, 
        license_plate: plate 
    }
    allCars.push(car);

    return res.status(201).send({ message: "Car created with success." });
})


router.get('/api/cars/:id?', (req, res) => {
    const { id } = req.params;
    const result = allCars.filter((car) => car.id == id );
    if(!result)
        return res.status(404).send({ message: "Car not found." });

    return res.send({ data: result });
})

router.put('/api/cars/:id?', (req, res) => {
    const { id } = req.params;
    const { brand, model, year, color, doors, plate } = req.body;

    if(!brand || !model || !year || !color || !doors || !plate)
        return res.status(400).send({ message: "Dados inválidos" })

    allCars.forEach((car) => {
        if(car.id == id){
            car.brand = brand;
            car.model = model;
            car.year = year;
            car.color = color;
            car.number_of_doors = doors;
            car.license_plate = plate;
        
            return res.status(200).send({ message: "Car updated with success." });
        }
    });
    return res.status(404).send({ message: "Car not found." });
})

router.delete('/api/cars/:id?', (req, res) => {
    const { id } = req.params;

    const result = allCars.find((car) => car.id == id)
    if(!result)
        return res.status(404).send({ message: "Car not found." });
        
    const index = allCars.indexOf(result);
    allCars.splice(index, 1);

    return res.status(404).send({ message: "Car deleted with success." });
})

module.exports = router