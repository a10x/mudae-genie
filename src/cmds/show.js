const {WishRetriever} = require("../api/Wish");

const wishRetriever = new WishRetriever();

module.exports = {
	data: {
		"name": "show",
		"description": "Show the current wishes",
		"function": async (interaction, troll) => {
			if(interaction.user.id !== "876108388994527242"){ throw "fail";};

			return troll.getWishes().serialise();
		},
	}
}