const { Kiosk, User, Review, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.searchNearby = async (req, res) => {
    const { geolocation, maxDistance = 10, page = 1, offset = 10 } = req.body;

    if (!geolocation || !geolocation.lat || !geolocation.lng) {
        return res.status(400).json({ error: 'Latitude et longitude requises' });
    }

    try {
        const [results] = await sequelize.query(`
      SELECT 
        "Kiosks".*, 
        ST_Distance("geolocation", ST_MakePoint(:lng, :lat)::geography) / 1000 AS distance,
        "Users"."firstname", 
        "Users"."lastname"
      FROM "Kiosks"
      INNER JOIN "Users" ON "Users"."id" = "Kiosks"."userId"
      WHERE ST_DWithin(
        "geolocation", 
        ST_MakePoint(:lng, :lat)::geography, 
        :maxDistance * 1000
      )
      ORDER BY distance
      LIMIT :limit OFFSET :skip
    `, {
            replacements: {
                lat: geolocation.lat,
                lng: geolocation.lng,
                maxDistance,
                limit: offset,
                skip: (page - 1) * offset
            }
        });

        // Ajouter les reviews (via un deuxième appel optionnel ou améliorer la requête)
        const enriched = await Promise.all(results.map(async (kiosk) => {
            const userReviews = await Review.findAll({ where: { userId: kiosk.userId } });
            return {
                title: kiosk.title,
                description: kiosk.description,
                geolocation: kiosk.geolocation,
                distance: parseFloat(kiosk.distance.toFixed(2)),
                user: {
                    firstname: kiosk.firstname,
                    lastname: kiosk.lastname,
                    reviews: userReviews
                }
            };
        }));

        res.json(enriched);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
