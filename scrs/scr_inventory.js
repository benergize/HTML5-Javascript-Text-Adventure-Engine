

/*__________________________________________________________________________________
//
//	FILENAME: scr_inventory.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Various functions which allow for the manipulation and processing of 
//	(cont.) items in the user's inventory.
//
//
*/


//Remove an item from the inventory
function invRemove(n) {
	for(var v = 0; v < inventory.length; v++) {
		if(inventory[v].name == n) {
			inventory.splice(v,1);
			return true;
		}
	}
	return false;
}

//See if player has an item in their inventory
function invCheck(n) {
	for(var v = 0; v < inventory.length; v++) {
		if(inventory[v].name == n) {
			return true;
		}
	}
	return false;
}

//Take inventory
function takeInventory() {
	if(inventory.length > 0) {
		var iva = "";
		for(var v = 0; v < inventory.length; v++) {
			if(inventory[v].pName != "") {
				iva += "   " + inventory[v].pName;
				if(v != inventory.length-1) { iva += "<br/>"; }
			}
		}
		
		if(iva != "") { return(iva); }
		else { return "There's nothing in your inventory."; }
	} else {
		return "There's nothing in your inventory.";
	}

}

//Locate an object in the inventory
function findInInventory(n) {
	
	//Go through the player's inventory
	for(var f = 0; f < inventory.length; f++) {
		
		//If the item is found
		if(inventory[f].name == n) {
			
			//Return it
			return inventory[f];
		}
	}
	
	//Item not found
	return false;
}