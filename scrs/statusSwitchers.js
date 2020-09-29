

/*__________________________________________________________________________________
//
//	FILENAME: statusSwitchers.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Various functions that change the game status to corrospond to various
//	(cont.) events. These initiate the statuses. Parsing of user input generally is
//	(cont.) handled by preParse.js.
//
//
*/


//Pose a yes or no question
function askQuestion(y,n) {
	status = 3;
	outcome[0] = y;
	outcome[1] = n;
}

//Pose a yes or no question (in secret)
function askSecretly(y,n) {
	status = 3.5;
	outcome[0] = y;
	outcome[1] = n;
}

//Pst what's the password?
function getPassword(pword,poutcome) {
	status = 4;
	passwordOutcome = poutcome;
	password = pword;
}

//Takes array of options.
//[0] = text to show
//[1] = function to do
function showChoice(choice) {
	status = 7;
	choicez = choice;
	
	options = "<i style = 'white-space:pre'> </i>Choices:<br/>";
	for(var v = 0; v < choicez.length; v++) { options += "<i style = 'white-space:pre'>  </i>" + ((v + 1) + ". " + choicez[v][0]) + "<br/>"; }
	echo(options);
	
}

function enterContinues(action) {
	echo("PRESS ENTER TO CONTINUE");
	status = 5;
	enterAction = action;
}