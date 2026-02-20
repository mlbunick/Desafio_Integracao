const fs = require("fs");
const path = require("path");

function generateReport(report, baseName = "report") {
    try {
        const now = new Date();

        const pad = (n) => String(n).padStart(2, "0");
        const dateStr = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
        const timeStr = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
        const timestamp = `${dateStr}_${timeStr}`;

        let filename = `${baseName}_${timestamp}.json`;
        let filePath = path.resolve(__dirname, "../../reports", filename);

        let counter = 2;
        while (fs.existsSync(filePath)) {
            filename = `${baseName}_${timestamp}_${counter}.json`;
            filePath = path.resolve(__dirname, "../reports", filename);
            counter++;
        }

        fs.writeFileSync(filePath, JSON.stringify(report, null, 2), "utf-8");

        console.log(`Relatório salvo em: ${filePath}`);
    } catch (error) {
        console.error("Erro ao gerar relatório:", error.message);
        throw error;
    }
}

module.exports = { generateReport };