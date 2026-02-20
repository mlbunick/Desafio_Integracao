const repository = require("../repositories/userRepository");

async function processUsers(apiUsers) {
    const report = {
        processado: 0,
        adicionado: 0,
        atualizado: 0,
        ignorado: 0,
        erros: []
    };

    for (const apiUser of apiUsers) {
        try {
            report.processado++;

            const age = apiUser.dob.age;

            if (age < 18) {
                report.ignorado++;
                continue;
            }

            const user = {
                externalId: apiUser.login.uuid,
                name: `${apiUser.name.first} ${apiUser.name.last}`,
                email: apiUser.email,
                gender: apiUser.gender,
                birthDate: apiUser.dob.date,
                age,
                streetNumber: apiUser.location.street.number,
                streetName: apiUser.location.street.name,
                city: apiUser.location.city,
                state: apiUser.location.state,
                country: apiUser.location.country,
                postcode: apiUser.location.postcode,
                latitude: apiUser.location.coordinates.latitude,
                longitude: apiUser.location.coordinates.longitude,
                timezoneOffset: apiUser.location.timezone.offset,
                timezoneDescription: apiUser.location.timezone.description,
                phone: apiUser.phone,
                cell: apiUser.cell,
                pictureLarge: apiUser.picture.large,
                pictureMedium: apiUser.picture.medium,
                pictureThumbnail: apiUser.picture.thumbnail
            };

            const existing = await repository.findByEmail(user.email);

            if (existing) {
                await repository.update(user);
                report.atualizado++;
            } else {
                await repository.insert(user);
                report.adicionado++;
            }
        } catch (error) {
            report.erros.push({
                email: apiUser.email,
                error: error.message
            });
        }
    }

    return report;
}

module.exports = { processUsers };