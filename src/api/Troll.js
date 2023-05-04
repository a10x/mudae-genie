const {populateEmbed} = require("../embeds");
const {Wishes} = require("./Wish");

const {grantProbability} = require("./../../config");

class Troll{
	constructor(channel){
		this.previousTroll = new Date();
		this.slashCommands = ["wa", "wx", "wg", "ha", "hx", "hg", "ma", "mg", "mx"];
		this.normalCommands = ["$w", "$wa", "$wx", "$wg", "$h", "$ha", "$hx", "$hg", "$m", "$ma", "$mg", "$mx"];
		this.channel = channel;

		this.wishes = new Wishes();
	}

	async grant(character){
		try{
			let messageSent = await this.channel.send(populateEmbed(character));
			let response = await messageSent.awaitMessageComponent({time: 60000});
			if(response.customId === "fakeClaim") await response.update({content: "get trolled 😝", components: [], embeds: []});	
		}catch(e){
			console.log(":(");	
		}
	}

	canTroll(message){
		if(this.slashCommands.includes(message?.interaction?.commandName))return true;
		if(this.normalCommands.includes(message?.content)) return true;
		return false;
	}

	async randomTroll(message){
		if(this.getRandomNumber() > 40000000/grantProbability && this.canTroll(message)){
			await this.grant(this.wishes.pickRandomChar())
			this.previousTroll = new Date();
		}
	}

	getRandomNumber(){
		return Math.floor((Math.random() * (new Date()-this.previousTroll)) + 1);
	}

	getWishes(){return this.wishes;}
	getChannel(){return this.channel;}
}

module.exports = {Troll};