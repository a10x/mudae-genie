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
		if(command.name === "show"){
			let jsonData = await command.function(interaction, troll);
			await interaction.reply({ content: codeBlock("json", JSON.stringify(JSON.parse(jsonData), null, 2)), ephemeral: true }); 
		}else{
			await command.function(interaction, troll);
			await interaction.reply({ content: command.replies.success, ephemeral: true });
		}
	}catch(error){
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
	troll.randomTroll(channel, message);
});

client.login(token);