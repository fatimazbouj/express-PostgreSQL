# API Express.js - (PostgreSQL + PostGIS)

## Objectif

Développer une API REST permettant :

- La gestion des utilisateurs
- L'authentification sécurisée avec JWT
- L'accès sécurisé aux données personnelles
- La gestion de kiosques avec positions géographiques
- La recherche géolocalisée de kiosques à proximité
- L'association d'avis (reviews) aux utilisateurs
- Des tests automatisés avec Jest et Supertest

---

## Technologies utilisées

- Node.js / Express.js
- PostgreSQL avec PostGIS (extension géographique)
- Sequelize ORM
- JWT (authentification)
- bcryptjs (hash des mots de passe)
- Jest + Supertest (tests)
- dotenv (configuration par variables d'environnement)

---

## Fonctionnalités principales

- Création de comptes utilisateurs
- Connexion et génération de token JWT
- Accès protégé aux informations d’un utilisateur connecté
- Ajout et recherche de kiosques avec coordonnées GPS
- Calcul de distance et filtrage géographique avec PostGIS
- Affichage des avis associés à chaque utilisateur
- Tests automatisés des endpoints critiques

---

## Installation du projet

1. Cloner le projet :

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
npm install
```

## Variables d'environement:
```bash
PORT=3000
NODE_ENV=development

DB_NAME=kiosk_db
DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=127.0.0.1

JWT_SECRET=kioskapisecretkey
```

## Creation base de données:

```bash
CREATE DATABASE kiosk_db;
CREATE EXTENSION postgis;
```

## Migration seeders:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## lancer le serveur ou les tests:

```bash
npm run dev / npm start
npm test
```


