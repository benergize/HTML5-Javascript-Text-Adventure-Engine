

/*__________________________________________________________________________________
//
//	FILENAME: parseInventory.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Handles requests pertaining to the players inventory. Allows for 
//	(cont.) manipulation of carried objects
//
//
*/


//God help you.
function parseInventory(input) {
	
	var stringFound = "";
	var objectFound = "";
	
	//For displaying all objects in the room
	var objectList = "";
	
	//Make it easier to parse
	input = input.toLowerCase();
	
	//See if they just inputed the inventory item name
	for(var v = 0; v < inventory.length; v++) {
		if(inventory.length > 0) {
			if(input == inventory[v].name && inventory[v].sight != undefined) {
				return inventory[v].sight;
			}
		}
	}
	
	
	//Split up the command
	input = input.split(" ");
	
	//Iterate through the interact word categories
	for(var v = 0; v < interactWords.length; v++) {
		
		//Now iterate through the words in each category
		for(var y = 0; y < interactWords[v].length; y++) {
			
			//Finally, iterate through the inputted strings array
			for(var i = 0; i < input.length; i++) {
				
				//See if one of the words entered matches an interact word
				if(input[i].search(interactWords[v][y]) != -1) {
					
					stringFound = interactWords[v][0];
					break;
				}
			}	
		}
	}
	
	//Look Around array
	var rooRay = [];
			
	//Go through all the objects in the inventory to see if one was mentioned
	for(objects = 0; objects < inventory.length; objects++) {
		
		//Iterate through the split input string to check for mentioned objects
		for(var i = 0; i < input.length; i++) {
		
			if(input[i].search(inventory[objects].name) != -1) {
				objectFound = inventory[objects];
				break;
			}
		}
	}
	
	
	if((stringFound != "" && objectFound != "") || input == "look around") {
		
		//The string that may or may not be returned
		var text = undefined;
		
		//Go through the senses and form a possible description
		if(stringFound == "take") {
			text = "You already have it!";
		}
		else if(stringFound == "drop") {
			invRemove(objectFound.name);
			roomList[currentRoom].roomObjects.push(objectFound);
			var objectFound = roomList[currentRoom].roomObjects[roomList[currentRoom].roomObjects.length-1];
			
			objectFound.take = function() {
				echo("You take the " + objectFound.name);
				inventory.push(objectFound);
				removeObject(currentRoom,objectFound.name);
			}
			
			text = "You drop the " + objectFound.name;
		}
		else {
			text = objectFound[stringFound];
		}
		
		//Return a description or an error
		if(text != undefined && typeof text !== "function") { return text; }
		else if(typeof text === "function") { text(); }
		else { return "You can't do that."; }
	
		
	}
	else { return ""; }
}