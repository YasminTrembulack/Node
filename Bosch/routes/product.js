// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// router
//         .get("/api/product", async (req, res) =>{
//             try {
//                 const result = await Product.find();
//                 return res.status(200).send({ body: result });
//             } 
//             catch (error) {
//                 return res.status(500).send({ message: error.message, error: error });
//             }
//         })

//         .get("/api/product/:id", async (req, res) =>{
//             const id = req.params.id;
//             try {
//                 const result = await Product.findById(id);
//                 return res.status(200).send({ body: result });
//             } 
//             catch (error) {
//                 return res.status(500).send({ message: error.message, error: error });
//             }
//         })

//         .post("/api/product", async (req, res) =>{
//             const body = req.body;
            
//             if (!body.name || !body.description || !body.color || !body.value || !body.qtd) 
//                 throw new Error(`Dados da inserção inválida!`)

//             const product = {
//                 name: body.name,
//                 description: body.description,
//                 color: body.color,
//                 value: body.value,
//                 qtd: body.qtd
//             };

//             try {
//                 const result = await Product.create(product);
//                 return res.status(201).send({ message: "Product created with success.", body: result });
//             } 
//             catch (error) {
//                 return res.status(500).send({ message: error.message, error: error }); 
//             }
//         })

//         .post("/api/products", async (req, res) =>{
//             const body = req.body;
        
//             try {
//                 var index = 1;
//                 body.forEach(p => {
//                     if (!p.name || !p.description || !p.color || !p.value || !p.qtd) 
//                         throw new Error(`Dados da inserção n° ${index} inválida!`)
//                     index++;
//                 });
//                 const result = await Product.insertMany(body);
//                 return res.status(201).send({ message: "Product created with success.", body: result });
//             } 
//             catch (error) {
//                 return res.status(500).send({ message: error.message, error: error }); 
//             }
//         })

//         .delete("/api/product/:id", async (req, res) =>{
//             const id = req.params.id;
//             try {
//                 const result = await Product.deleteOne({ _id: id });
//                 return res.status(200).send({ message: "Product deleted with success.", body: result  })
//             } catch (error) {
//                 return res.status(500).send({ message: error.message, error: error }); 
//             }
//         })

//         .put("/api/product/:id", async (req, res) =>{
//             const id = req.params.id;

//             if (!body.name || !body.description || !body.color || !body.value || !body.qtd) 
//                 throw new Error(`Dados da inserção inválida!`)
            
//             const product = {
//                 name: body.name,
//                 description: body.description,
//                 color: body.color,
//                 value: body.value,
//                 qtd: body.qtd
//             };

//             try {
//                 const result = await Product.replaceOne({ _id: id }, product)
//                 return res.status(200).send({ message: "Product replaced with success.", body: result  })
//             } catch (error) {
//                 return res.status(500).send({ message: error.message, error: error }); 
//             }

//         })
        



// module.exports = router