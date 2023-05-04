const {adminId} = require("./../../config");

module.exports = {
	data: {
		"name": "show",
		"description": "Show the current wishes",
		"function": async (interaction, troll) => {
			if(interaction.user.id !== adminId){ throw "fail";};
			return troll.getWishes().serialise();
		},
		"replies": {
			"success": "",
			"fail": "Unable to show wishes"
		}
	}
}