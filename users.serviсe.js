const fs = require("node:fs/promises");
const path = require("node:path");

const usersPath = path.join(process.cwd(), 'users.json');

module.exports = {
    getAllUsers: async () => {
        const response = await fs.readFile(usersPath);
        const usersJson = response.toString();
        return usersJson ? JSON.parse(usersJson) : [];
    },
    pushAllUsers: async (users) => {
        await fs.writeFile(usersPath, JSON.stringify(users));
    }
}