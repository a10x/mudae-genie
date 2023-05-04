const {WishRetriever} = require("../api/Wish");

const {adminId} = require("./../../config");

const wishRetriever = new WishRetriever();

module.exports = {
	data: {
		"name": "notify",
		"description": "Add a character",
		"options": [
			{
				"name": "username",
				"description": "username",
				"type": 6,
				"required": true
			},
			{
				"name": "messageid",
				"description": "message id of the embed",
				"type": 3,
				"required": true
			}
		],
		"function": async (interaction, troll) => {

			if(interaction.user.id !== adminId){ throw "fail";};

			let username = interaction.options.data[0].value;
			let messageId = interaction.options.data[1].value;

			let wishedChar = await wishRetriever.retrieve(troll.getChannel(), messageId);

			wishedChar.addWishedBy(username);
			troll.getWishes().addNewWish(wishedChar);
		},
		"replies": {
			"success": "Wish added successfully",
			"fail": "Unable to add wish"
		}
	}
}