const {adminId} = require("./../../config");

module.exports = {
	data: {
		"name": "grant",
		"description": "Add a character",
		"options": [
			{
				"name": "character",
				"description": "name of the character",
				"type": 3,
			}
		],
		"function": async (interaction, troll) => {
			let options = interaction.options.data;
			let charToGrant = null;
			if(options.length) charToGrant = troll.getWishes().getWish(options[0].value);
			else charToGrant = troll.getWishes().pickRandomChar();

			troll.grant(charToGrant);
		},
		"replies": {
			"success": "granted",
			"fail": "Unable to add wish"
		}
	}
}