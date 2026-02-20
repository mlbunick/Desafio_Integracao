const axios = require("axios");

async function fetchUsers(count = 150) {
    try {
        const response = await axios.get("https://randomuser.me/api/", {
            params: { results: count }
        });

        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
        throw error;
    }
}

module.exports = { fetchUsers };