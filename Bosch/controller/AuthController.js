const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { use } = require('../routes/auth');

require('dotenv').config();

class AuthController {
    static async register(req, res)
    {
        const { name, email, password, confirmPassword } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).send({ message: "Email já cadastrado"})

        if (password != confirmPassword) return res.status(400).send({ message: "As senhas não coincidem"})

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: passwordHash
        });

        try {
            await user.save();
            res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }
    static async login(req, res)
    {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if(!user) return res.status(400).send({ message: "Invalid Email or Password" });
        if(!await bcrypt.compare(password, user.password)) 
            return res.status(400).send({ message: "Invalid Email or Password" });
        
        const secret = process.env.SECRET;

        const token = jwt.sign(
            { id: user._id, }, secret, { expiresIn: '2 days' }
        );

        return res.status(200).send({token: token})
    }

    static async delete(req, res)
    {
        const authHeader = req.headers.authorization;
        const id = req.params.id;
        
        const [scheme, token] = authHeader.split(' ');

        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ message: 'Unauthorized' });
        });
        
        try {
            const user = await User.findOne({ _id: id });
            if (!user) return res.status(400).send({ message: "User not found" });

            const result = await User.deleteOne({ _id: id });
            return res.status(200).send({ message: "User deleted with success.", body: result  })
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }


    }
}
module.exports = AuthController;