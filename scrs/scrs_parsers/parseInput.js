

/*__________________________________________________________________________________
//
//	FILENAME: parseInput.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Oh jesus what a mess. Handles input from main dungeon navigation. This
//	(cont.) is extremely bloated and should be turned into several different files.	
//
//
*/

function parseInput(input) {
	
	var stringFound = "";
	var objectFound = "";
	
	//Is input a cardinal direction?
	cD = false;
	
	//Did they enter a magic word?
	magicWord = false;
	
	//For displaying all objects in the room
	var objectList = "";
	
	//Make it easier to parse
	input = input.toLowerCase();
	
	//Figure out if the user wants to go somewhere via n,s,w,e,d,u
	if(parseFunc_goDir(input) != false) {
		input = parseFunc_goDir(input);
		cD = true;
	}
	
	//Show exits
	if(input == "exits") { return parseFunc_getExits(); }
	
	//Return room name or number
	if(input == "name") { return roomList[currentRoom].pName; }
	
	//Take inventory
	if(input.search("inventory") != -1) { return takeInventory(); }
	
	//Show status
	if(input == "status") { return "Health: " + hp + "/" + maxhp + ". Mana: " + mp + "/" + maxmp + "."; }
	
	//Parse for inventory queries
	var vsi = parseInventory(input);
	if(vsi != "") { return vsi; }
	
	//Return list of spells.
	//Not at all well implemented.
	if(input == "spells") {
	
		if(inventory.length > 0) {
			var iva = "";
			for(var v = 0; v < inventory.length; v++) {
				if(inventory[v].cast != null) {
					iva += "   " + inventory[v].name;
					if(v != inventory.length-1) { iva += "<br/>"; }
				}
				
			}
			
			if(iva != "") { return(iva); }
			else { return "You have no spells."; }
		} else {
			return "You have no spells.";
		}

	}
	
	//Repeat room description
	if(input == "description" || input == "intro" || input == "desc") { return roomList[currentRoom].intro; }
	
	//We want to show all objects in room
	if(input == "look" || input == "search" || input == "search room") { input = "look around"; }
	
	//If the input is just the name of an object, 
	//give that object's sight response (if it has one--which it should)
	for(var v = 0; v < roomObjects.length; v++) {
		
		//Ensure that the object were trying to look at has a 'sight' to see
		if(roomObjects[v].sight != undefined) {
			
			//If they put in the object's name
			if(input == roomObjects[v].name) {
				return roomObjects[v].sight;
			}
			
			//Or one of its aliases
			else if(roomObjects[v].aliases != undefined) {
				for(var as = 0; as < roomObjects[v].aliases.length; as++) {
					if(input == roomObjects[v].aliases[as]) {
						return roomObjects[v].sight;
					}
				}
			}
		}
	}
	
	//Split up the input unless they just want an overview
	if(input != "look around" && !magicWord) { input = input.split(" "); }
	
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
	
	//Mobile version++
	var mRooRay = [];		
	
			
	//Go through all the objects in the room to see if one was mentioned
	for(objects = 0; objects < roomObjects.length; objects++) {
		
		//Iterate through the split input string to check for mentioned objects
		for(var i = 0; i < input.length; i++) {
		
			//Check for object name
			if(input[i].search(roomObjects[objects].name) != -1) {
				objectFound = roomObjects[objects];
				break;
			}
			
			//Or alias!
			if(roomObjects[objects].aliases != undefined) {
				for(var as = 0; as < roomObjects[objects].aliases.length; as++) {
					if(input[i] == roomObjects[objects].aliases[as]) {
						objectFound = roomObjects[objects];
						break;
						break;
					}	
				}
			}
			
		}
		
		//While we're here, put together a list of objects for the "look around" display
		if(input == "look around") { 
			var curName = roomObjects[objects].pName;
			
			//Check to see if it actually wants to be listed
			if(curName != "") {
				rooRay.push(curName);
				mRooRay.push(roomObjects[objects].name);
			}
		}
	}
	
	
	if(input == "look around") {
		for(var v = 0; v < rooRay.length; v++) {
			
			//Last one? 
			if(v == rooRay.length - 1 && rooRay.length != 1) { objectList += "and " }
			
			//Check if it should be a, an, or some.
			if(rooRay[v].charAt(rooRay[v].length - 1) != "s") {
				
				//Check for vowel at first letter
			
				if("aeiou".indexOf(rooRay[v].charAt(0)) != -1) { objectList += "an " + rooRay[v] + ""; }
				else { objectList += "a " + rooRay[v] + ""; }
			
			}
			
			//Multiple things
			else {
			
				objectList += "" + rooRay[v] + "";	
				
			}
			
			//Last one? 
			if(v != rooRay.length - 1) { objectList += ", "; }
			else { objectList += "." }
		}
	}
	
	
	if((stringFound != "" && objectFound != "") || magicWord || input == "look around") {
		
		//Spacing
		if(stringFound == "heyyahooee") { return "Jonah, why?"; }
		
		//Return the contents of the room, or the senses
		if(input == "look around") { return "There's " + objectList; }
		else {
			
			//The string that may or may not be returned
			var text = undefined;
			
			//Go through the senses and form a possible description
			text = objectFound[stringFound];
			
			//Return a description or an error
			if(text != undefined && typeof text !== "function") { return text; }
			else if(typeof text === "function") { text(); }
			else { 
				if(!cD) { 
					if(Math.random()>.5) {return "You can't do that."; }
					else{ return "That won't do anything."; }
				}
				else { return "You can't go that way."; }
			}
		}
	}
	else { 
		if(!cD) { return failure(); }
		else { return "You can't go that way."; }
	}
}