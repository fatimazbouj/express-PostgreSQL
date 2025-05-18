const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, countryCode, phone, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existing = await User.findOne({ where: { countryCode, phone } });
        if (existing) return res.status(409).json({ error: 'Utilisateur déjà existant' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstname,
            lastname,
            countryCode,
            phone,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès', userId: newUser.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

exports.login = async (req, res) => {
    try {
        const { countryCode, phone, password } = req.body;

        const user = await User.findOne({ where: { countryCode, phone } });
        if (!user) return res.status(401).json({ error: 'Identifiants invalides' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.json({ accessToken: token, userId: user.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
