

/*__________________________________________________________________________________
//
//	FILENAME: preParse.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Takes input sent from function submitQuery and sends it to one
//	(cont.) of a number of advanced parsers, depending on what the game status is.	
//
//
*/



//This is super important as it decides what to do with our input/where to send it
function preParse(e) {

	//Sanitize user input
	e = e.replace(/[\|&;\$%@"<>\(\)\,]/g, "");
	
	//DEBUG
	if(global.debug) {
		if(e == "dload") { status = 6; return "Select a room:"; }
		if(e == "number") { return currentRoom-1; }
		if(e == "roomnumber") { return " " + currentRoom; }
	}
	
	//Things that should be executable in navigatory statuses
	if(status == 0 || status == 1 || status == 2) {
			
		//If it's a joke answer, parse it
		var joke = jokeAnswers(e);
		if(joke != "") {
			if(typeof joke === "string") { return joke; }
			else { joke(); }			
		}
		
		//Command line specific
		if(e.toLowerCase() == "tscpt") { return tscpt(); }
		if(e.toLowerCase() == "fullscreen") { return fullScreen(); }
		if(e.toLowerCase() == "help") { return help(); }
		if(e.toLowerCase() == "cls") { return cls(); }
		if(e.toLowerCase() == "font") { return changeFont(); }
		if(e.toLowerCase() == "about" || e == "version") { return about(); }
		if(e.toLowerCase() == "save") { return save(); }
		if(e.toLowerCase() == "load") { return "Pleasae refresh the page to load."; }
		if(e.toLowerCase() == "shutdown") { $("body").fadeOut(2000, function(){}); return "It is now safe to turn off your computer."; }
	}

	//We're in the dungeon, moving and looking at things
	if(status == 0) {
		e = parseInput(e);
		if(typeof e === "string") {
			return e;
		}
		else if(typeof e === "function") { e(); }
	}
	
	//Combat!
	else if(status == 1) {
		return parseCombat(e);
	}
	
	//Moving in a labyrinth
	else if(status == 2) {
		return parseLab(e);
	}
	
	//Answer a Y/N question
	else if(status == 3) {
		e = e.toLowerCase();
		if(e == "y") { 
			outcome[0](); 
			if(status == 3) { status = 0; }
		}
		else if(e == "n") { 
			outcome[1]();
			if(status == 3) { status = 0; } 
		}
		else { 
			echo("(Y or N)"); 
			status = 3; 
		}
	}
	
	//Answer a Y/N question (in secret!)
	else if(status == 3.5) {
		e = e.toLowerCase();
		if(e == "y" || e == "yes" || e == "yeah" || e == "yes?" || e == "yep" || e == "sure" || e == "okay" || e == "why not") { outcome[0](); status = 0;}
		else if(e == "n") { outcome[1](); status = 0; }
		else { 
			status = 0;
			echo(preParse(e));
		}
	}
	
	//Enter a password
	else if(status == 4) {
		e = e.toLowerCase();
		if(e === password) {
			passwordOutcome();
			if(status == 4) { status = 0; }
		} else {
			echo("Incorrect.");
			status = 0;
		}
	}
	
	//"Press Enter to Continue"
	else if(status == 5) {
		enterAction();
		
		//We never had problems with this because usually enterContinues()
		//lead to another status switcher, but when it doesn't, you end
		//up frozen in status 5. This fixes that.
		if(status == 5) { status = 0; }
	}
	
	//Debug load room
	else if(status == 6) {
		loadRoom(parseInt(e));
		status = 0;
	}
	
	
	//Show choice
	//[*][0] - Text to show
	//[*][1] - Function to perform
	else if(status == 7) {
		
		//Run through all the choices provided in showChoice function
		for(var v = 0; v < choicez.length; v++) {
			
			//If the user input matches a number in the choice list
			if(parseInt(e) - 1 == v && e != "") {
				
				//Execute the choice
				choicez[v][1]();
				
				//If the status is still 7 (meaning that we haven't
				//chained an enterContinues() or the like, return
				//to dungeon navigation.
				if(status == 7) { status = 0; }
				
				//Get outa this function
				return;
			}
		}
		
		//If we get here it means they didn't enter a valid choice.
		//Show them options again.
		options = "<i style = 'white-space:pre'> </i>Choices:<br/>";
		for(var v = 0; v < choicez.length; v++) { options += "<i style = 'white-space:pre'>  </i>" + ((v + 1) + ". " + choicez[v][0]) + "<br/>"; }
		echo(options);
		status = 7;
	}
	
	
	//Load game.
	//I can't remember exactly how this works or what it's doing, but it works as is.
	else if(status == 8) {

		askQuestion(
			function() {
				enterContinues(
					function() {
						cls();
						enterContinues(
							function() {
								//Wait for 'return'
								enterContinues(
									function() {
										echo("So welcome!<br><br>Type HELP at any time to hear those instructions again.<br/>");
										loadRoom(0);
										status = 0;
									}
								);
							}
						);
					}
				);
		
			},
			
			//No help needed
			function() {
				
				//Clear screen and begin game!
				cls();
				echo("Welcome!<br><br>Type HELP if you change your mind.<br/>");
				loadRoom(0);
				
			}
		);
		
		load(e);
	}
	
}