

/*__________________________________________________________________________________
//
//	FILENAME: scr_parseFunc_goDir.css
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Changes user input from "n" or "north" to a fully formed movement 
//	(cont.) request. Sort of a HACK.
//
//
*/


//Cardinal direction abbreviations

function parseFunc_goDir(input) {
	
	//Cardinal directions
	if(input == "n" || input == "north") { cD = true; return "go north"; }
	else if(input == "s" || input == "south") { cD = true; return "go south"; }
	else if(input == "e" || input == "east") { cD = true; return "go east"; }
	else if(input == "w" || input == "west") { cD = true; return "go west"; }
	
	//Going down
	else if(input == "d" || input == "down") { cD = true; return "go down";	}
	
	//Going up
	else if(input == "u" || input == "up") { cD = true; return "go up"; }
	
	//If it's none of the above, then a cardinal direction wasn't entered.
	else { return false; }
}