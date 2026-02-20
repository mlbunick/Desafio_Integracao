const db = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

function findByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) return reject(err);
            resolve(row || null);
        });
    });
}

function insert(user) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users (
                id, external_id, name, email, gender, birth_date, age,
                street_number, street_name, city, state, country, postcode,
                latitude, longitude, timezone_offset, timezone_description,
                phone, cell,
                picture_large, picture_medium, picture_thumbnail
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            uuidv4(),
            user.externalId,
            user.name,
            user.email,
            user.gender,
            user.birthDate,
            user.age,
            user.streetNumber,
            user.streetName,
            user.city,
            user.state,
            user.country,
            user.postcode,
            user.latitude,
            user.longitude,
            user.timezoneOffset,
            user.timezoneDescription,
            user.phone,
            user.cell,
            user.pictureLarge,
            user.pictureMedium,
            user.pictureThumbnail
        ];

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve();
        });
    });
}

function update(user) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE users
            SET name=?, gender=?, birth_date=?, age=?,
                street_number=?, street_name=?, city=?, state=?, country=?, postcode=?,
                latitude=?, longitude=?, timezone_offset=?, timezone_description=?,
                phone=?, cell=?,
                picture_large=?, picture_medium=?, picture_thumbnail=?
            WHERE email=?
        `;

        const params = [
            user.name,
            user.gender,
            user.birthDate,
            user.age,
            user.streetNumber,
            user.streetName,
            user.city,
            user.state,
            user.country,
            user.postcode,
            user.latitude,
            user.longitude,
            user.timezoneOffset,
            user.timezoneDescription,
            user.phone,
            user.cell,
            user.pictureLarge,
            user.pictureMedium,
            user.pictureThumbnail,
            user.email
        ];

        db.run(query, params, function (err) {
            if (err) return reject(err);
            resolve();
        });
    });
}

module.exports = { findByEmail, insert, update };