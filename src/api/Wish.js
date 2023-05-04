class WishedChar{
	constructor(name, anime, claimRank, value, imageUrl, wishedBy=[]){
		this.name = name;
		this.anime = anime;
		this.claimRank = claimRank;
		this.value = value;
		this.imageUrl = imageUrl;
		this.wishedBy = wishedBy;
	}

	addWishedBy(userId){
		this.wishedBy.push(userId);
	}

	getName(){return this.name;}
	getAnime(){return this.anime;}
	getClaimRank(){return this.claimRank;}
	getValue(){return this.value;}
	getImageUrl(){return this.imageUrl;}
	getWishedBy(){return this.wishedBy;}

	toJSON(){
		return `{"name": "${this.getName()}", "anime": "${this.getAnime()}","rank": "${this.getClaimRank()}","value": "${this.getValue()}","url": "${this.getImageUrl()}","wishedBy": ${JSON.stringify(this.getWishedBy())}}`;
	}
}

class Wishes{

	constructor(){
		this.wishes = new Map();
	}

	addNewWish(wishedChar){
		let existingWish = this.wishes.get(wishedChar.getName());
		if(existingWish){
			let wishedBy = wishedChar.getWishedBy();
			for(let wb of wishedBy)
				if(!existingWish.getWishedBy().includes(wb)) existingWish.addWishedBy(wb);
			return;
		}
		this.wishes.set(wishedChar.getName(), wishedChar);
	}

	updateWish(charName, wishedBy){
		let wishedChar = this.wishes.get(charName);
		if(wishedChar) this.wishedChar.addWishedBy(wishedBy);
	}

	getWish(key){return this.wishes.get(key)}
	
	pickRandomChar(){
		let keys = Array.from(this.wishes.keys());
		return this.getWish(keys[Math.floor(Math.random() * keys.length)]);
	}

	serialise(){
		let data = `{"data": [`;
		let keys = Array.from(this.wishes.keys());
		for(let keyIndex in keys){
			data += `${this.getWish(keys[keyIndex]).toJSON()}`;
			if(keyIndex < keys.length-1) data += ",";

		}
		data += "]}";
		return data;
	}

	deserialise(data){
		let jsonData = JSON.parse(data);

		for(let wish of jsonData.data){
			this.addNewWish(new WishedChar(wish.name, wish.anime, wish.rank, wish.value, wish.url, wish.wishedBy));
		}
	}
}

class WishRetriever{
	async retrieve(channel, messageId){
		let message = await channel.messages.fetch(messageId);
		if(message.author.id !== "432610292342587392") return;

		let embed = message.embeds[0].data;

		let character = embed.author.name;
		character = character.replace(/(\r\n|\n|\r)/gm, " ");
		let url = embed.image.url;
		let anime = embed.description.split("<")[0];
		anime = anime.replace(/(\r\n|\n|\r)/gm, " ");
		let kakera = embed.description.split("**")[1];
		
		let descs = embed.description.split(": #")[1];
		let claim = descs.split("\n")[0];

		return new WishedChar(character, anime, claim, kakera, url);
	}


}

module.exports = {WishedChar, Wishes, WishRetriever};