const {populateEmbed} = require("../embeds");
const {Wishes} = require("./Wish");

const {grantProbability} = require("./../../config");

class Troll{
	constructor(channel){
		this.previousTroll = new Date();
		this.slashCommands = ["wa", "ha"];
		this.normalCommands = ["$wa", "$ha"];
		this.channel = channel;

		this.wishes = new Wishes();
	}

	async troll(channel){
		try{
			let messageSent = await channel.send(populateEmbed(this.wishes.pickRandomChar()));
			let response = await messageSent.awaitMessageComponent({time: 60000});
			if(response.customId === "fakeClaim") await response.update({content: "get trolled 😝", components: [], embeds: []});
			this.previousTroll = new Date();
		}catch(e){
			console.log(":(");
		}
	}

	canTroll(message){
		if(this.slashCommands.includes(message?.interaction?.commandName))return true;
		if(this.normalCommands.includes(message?.content)) return true;
		return false;
	}

	randomTroll(channel, message){
		if(this.getRandomNumber() > 3000000/grantProbability && this.canTroll(message))this.troll(channel);
	}

	getRandomNumber(){
		return Math.floor((Math.random() * (new Date()-this.previousTroll)) + 1);
	}

	getWishes(){return this.wishes;}
	getChannel(){return this.channel;}
}

module.exports = {Troll};