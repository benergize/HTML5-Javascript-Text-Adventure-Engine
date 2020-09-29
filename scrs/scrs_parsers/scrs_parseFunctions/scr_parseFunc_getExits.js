

/*__________________________________________________________________________________
//
//	FILENAME: scr_parseFunc_getExits.css
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Returns a formatted list of exits to the current room.
//
//
*/



//Show exits
function parseFunc_getExits() {
	var exits = "Exits: "
	for(var v = 0; v < roomList[currentRoom].roomObjects.length; v++) {
		switch(roomList[currentRoom].roomObjects[v].name) {
			case "north":
				exits += " North,"
				break;
			case "south":
				exits += " South,"
				break;
			case "east":
				exits += " East,"
				break;
			case "west":
				exits += " West,"
				break;
			case "down":
				exits += " Down,"
				break;
			case "up":
				exits += " Up,"
				break;
		}
	}
	if(exits != "Exits:") {
		exits = exits.slice(0,exits.length - 1) + ".";
		return exits;
	} else { return "There are no exits!"; }

}