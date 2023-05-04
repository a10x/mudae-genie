const fs = require('node:fs');

const {saveFilePath} = require("./../../config");

const loadSave = ()=>{
	let jsonData = "";
	try{
		jsonData = fs.readFileSync(saveFilePath, "utf8");
	}catch(error){
		throw "fail";
	}
	return jsonData;
}

module.exports = {
	data: {
		"name": "load",
		"description": "Load wishes from a file",
		"function": async (interaction, troll) => {
			if(interaction.user.id !== "876108388994527242"){ throw "fail";}
			let data = loadSave();
			console.log(JSON.parse(data));
			troll.getWishes().deserialise(data);

		},
		"replies": {
			"success": "Wishes loaded successfully",
			"fail": "Unable to load wishes"
		}
	}
}