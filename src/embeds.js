const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const generateContent = (wishedBy)=>{
	let content = "Wished by ";

	for(let i in wishedBy){
		content += `<@${wishedBy[i]}>`;
		if(i !== wishedBy.length-1) content += ", ";
	}
	return content;
}

const getButton = ()=>{
	const claimButton = new ButtonBuilder()
	.setCustomId("fakeClaim")
	.setEmoji("💘")
	.setStyle(ButtonStyle.Secondary);

	return new ActionRowBuilder().addComponents(claimButton);
}

const populateEmbed = (wishedChar)=>{
	return {
		"content": generateContent(wishedChar.getWishedBy()),
		"embeds": [
		  {
			 "title": wishedChar.getName(),
			 "description": `${wishedChar.getAnime()}\nClaims: #${wishedChar.getClaimRank()}\n**${wishedChar.getValue()}**<:kakera:1103386011188351017>`,
			 "color": 1360437,
			 "footer": {
				"text": `${wishedChar.getName()} / ${wishedChar.getAnime()} - ${wishedChar.getValue()} ka`
			 },
			 "image": {
				"url": wishedChar.getImageUrl()
			 }
		  }
		],
		"attachments": [],
		"components": [getButton()]
	 }
}

module.exports = {populateEmbed}