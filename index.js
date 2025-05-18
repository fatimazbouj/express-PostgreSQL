const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/users.route');
const kioskRoutes = require('./routes/kiosk.route');

const app = express();
app.use(express.json());
app.use(authRoutes); // Ajout des routes auth
app.use(userRoutes); // Ajout des routes user
app.use(kioskRoutes); // Ajout des routes kiosk

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}


module.exports = app;