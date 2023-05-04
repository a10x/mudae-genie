const fs = require('node:fs');

const {saveFilePath, adminId} = require("./../../config");

const createSave = (data)=>{
	fs.writeFileSync(saveFilePath, data, err=>{
		if(err) throw "fail";
	});
}

module.exports = {
	data: {
		"name": "save",
		"description": "Save current wishes to a file",
		"function": async (interaction, troll) => {
			if(interaction.user.id !== adminId){ throw "fail";}
			let jsonData = troll.getWishes().serialise();
			createSave(jsonData);
		},
		"replies": {
			"success": "Wishes saved successfully",
			"fail": "Unable to save wishes"
		}
	}
}