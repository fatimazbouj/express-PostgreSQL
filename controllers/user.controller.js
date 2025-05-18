const { User } = require('../models');

exports.getUserInfo = async (req, res) => {
    const requestedId = parseInt(req.params.id);
    const loggedInUserId = req.user.userId;

    // l'utilisateur ne peut voir que ses propres infos
    if (requestedId !== loggedInUserId) {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    try {
        const user = await User.findByPk(requestedId, {
            attributes: ['id', 'firstname', 'lastname', 'countryCode', 'phone', 'createdAt', 'updatedAt']
        });

        if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
