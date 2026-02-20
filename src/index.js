const { fetchUsers } = require("./services/randomUserService");
const { processUsers } = require("./services/userService");
const { generateReport } = require("./services/reportService");

async function main() {

    const users = await fetchUsers();

    const report = await processUsers(users);

    generateReport(report);

    console.log("Finalizado!");
    console.log(report);

}

main();