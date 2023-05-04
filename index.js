const {Client, Events, GatewayIntentBits, codeBlock} = require("discord.js");

const {token, channelId} = require("./config");
const {commands, deployCommands} = require("./src/deployCommands");
const {Troll} = require("./src/api/Troll");

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
client.commands = commands;
let channel = null;
let troll = null;

client.once(Events.ClientReady, c=>{
	console.log("Ready!");

	channel = client.channels.cache.get(channelId);
	troll = new Troll(channel);

	deployCommands();
});

client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if(!command) return;

	try{
		let output = await command.function(interaction, troll);
		let reply = command.replies.success; 

		if(command.name === "show") reply = codeBlock("json", JSON.stringify(JSON.parse(output), null, 2));
		if(reply) await interaction.reply({ content: reply, ephemeral: true });
	}catch(error){
		console.log(error);
		if(error === "fail") 
			await interaction.reply({ content: command.replies.fail, ephemeral: true });

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Events.MessageCreate, async message =>{
	if(message.author.id === "432610292342587392") return;
	if(message.channelId !== channelId) return;
	await troll.randomTroll(channel, message);
});

client.login(token);