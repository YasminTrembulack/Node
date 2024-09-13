const { User }  = require('../model/user');
const jwt = require('jsonwebtoken');
const { Author} = require('../model/author')

require('dotenv').config();

const CryptoJS = require("crypto-js");
const moment = require('moment');
const { config } = require('dotenv');

class AuthController {
    static async register(req, res) {
        var key = process.env.SECRET;
        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, key);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json = JSON.parse(decryptd);
        // console.log(json);
        
        const { name, birth, login, email, password, confirmPassword } = json;
        
        if (!name) return res.status(400).json({ message: "O nome é obrigatório" });
        if (!email) return res.status(400).json({ message: "O e-mail é obrigatório" });
        if (!password) return res.status(400).json({ message: "A senha é obrigatória" });
        if (!login) return res.status(400).json({ message: "O login é obrigatório" });

        const userExist = await User.findOne({ $or: [{ email: email },{ login: login }] });

        if (userExist) {
            if (userExist.email === email) {
                return res.status(422).json({ message: "E-mail já está em uso" });
            }
            if (userExist.login === login) {
                return res.status(422).json({ message: "Login já está em uso" });
            }
        }
        console.log(password);
        console.log(confirmPassword);
        
        
        if (password != confirmPassword) return res.status(400).json({ message: "As senhas não conferem" });

        const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
        // const birthDate = moment(birth, "DD/MM/YYYY").toDate();
        
        try {
            const author = new Author({
                name,
                email,
                birth,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            })
            const newAuthor = await Author.create(author);
    
            const user = new User({
                author: newAuthor._id,
                login,
                password: passwordCrypt,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            });
            await User.create(user);
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }
    }
    
    static async login(req, res) {
        var key = process.env.SECRET;
        var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, key);
        const decryptd = bytes.toString(CryptoJS.enc.Utf8);
        const json = JSON.parse(decryptd);
      
        const { login, password } = json;

        if (!login) return res.status(400).json({ message: "O e-mail é obrigatório" });
        if (!password) return res.status(400).json({ message: "A senha é obrigatória" });

        const user = await User.findOne({ login: login }).populate('author');

        if (!user) return res.status(422).json({ message: "E-mail inválido" });
        
        
        var userPassword = CryptoJS.AES.decrypt(user.password, key).toString(CryptoJS.enc.Utf8);
        if (userPassword != password) return res.status(422).json({ message: "Senha inválida" });
        
        try {
            const token = jwt.sign(
                {
                    id: user._id,
                },
                key,
                {
                    expiresIn: '2 days'
                }
            );
            
            return res.status(200).send({token: token})
        } catch (error) {
            return res.status(500).send({ message: "Something failed", data: error.message })
        }

        // const token = jwt.sign(
        //     {name: user.name, id: user._id, author: user.author._id }, key, { expiresIn: 10800 }
        // );
        
        // return res.status(200).send({token: token})
    }

    static async verifyJWT(req, res, next)
    {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

        const [scheme, token] = authHeader.split(' ');

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(401).json({ message: 'Unauthorized' });
            req.userId = decoded.id;
            req.authorId = decoded.author;
            req.username = decoded.name;
            next();
        });
    }
}
module.exports = AuthController;