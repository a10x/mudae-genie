const fs = require('node:fs');
const path = require('node:path');

const { REST, Routes, Collection } = require('discord.js');

const { clientId, guildId, token } = require('../config');

const commandsPath = path.join(__dirname, "cmds");
const commandFiles = fs.readdirSync(commandsPath);

const commands = new Collection();

for(const file of commandFiles){
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.set(command.data.name, command.data);
}

const rest = new REST().setToken(token);

module.exports = {
	commands: commands,

	deployCommands: async ()=>{
		try {
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);
	
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(error);
		}	
	}
}