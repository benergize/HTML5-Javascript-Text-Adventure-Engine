

/*__________________________________________________________________________________
//
//	FILENAME: scr_inventory.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Returns the player's rank based on their score. The implementation of 
//	(cont.) this is pretty garbage. 
//
//
*/


//Be more creative with this.
var ranks = [
	[20, "Wandering Doofus", "How you ended up in the underground dungeon is a mystery, but it's safe to say you could have done a better job."],
	[120, "Novice Adventurer", "Your aspirations were admirable, but your training didn't seem to be adiquate. Maybe in another life you could have succeded!"],
	[160, "Adventurer", "Though you succumbed to the same fate as many who attempted to beat the dungeon, you gave a more valient effort than many. You are truly an adventurer!"],
	[200, "Knight", "Your deeds in this dungeon will be written in the books, and though you will not be a legend, there will be those who look up to your exploits"],
	[260, "Caver", "Your deeds speak for themselves! You achieved the incredible, conquering many of the hazards of the dungeon--you even saw things some never dreamed of."],
	[300, "Champion","I wasn't even sure this score was possible. You are a thorough dungeneer, and deserve praise of all people. Perhaps in the next adventure, you will take on The King of Evil himself..."],
	[370, "Legend", "Okay, either you're cheating, or you're impossibly good at this game. Congratulations!!!"]
];

function getRank() {
	for(var v = 0; v < ranks.length; v++) {
		if(score <= ranks[v][0]) {
			return v;
		}
	}
	return "A rank fetch error has occured. Sorry about that. Please rest assured you're still awesome.";
}