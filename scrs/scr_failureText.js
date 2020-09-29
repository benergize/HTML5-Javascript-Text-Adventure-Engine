

/*__________________________________________________________________________________
//
//	FILENAME: scr_failureText.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Returns a random string from an array of "I didn't understand that"
//	(cont.) strings.	
//
//
*/

function failure() {
	eText = [];
	eText[0] = "I'm sorry, my responses are limited. You must ask the right questions.";
	eText[1] = "I didn't catch that.";
	eText[2] = "Could you repeat the question.";
	eText[3] = "Rephrase that, would you?";
	eText[4] = "Could you dumb that down a shade?";
	eText[5] = "I don't understand.";
	eText[6] = "What?";
	eText[7] = "Huh?";
	eText[8] = "I can't let you do that, Dave... Because I don't understand what you want.";
	eText[9] = "Try saying that some other way.";
	eText[10] = "I don't get it.";
	eText[11] = "I'm struggling.";
	eText[12] = "Does not compute.";
	eText[13] = "I'm not a genius, please try that again.";
	eText[14] = "Input that some other way.";
	eText[15] = "Didn't understand that response.";
	eText[16] = "Please try saying that some other way.";
	eText[17] = "I'm sorry, I don't know what to do with that input.";
	eText[18] = "No comprendo.";
	eText[19] = "You're not making any sense!"
	eText[20] = "I'm sorry. Did you say something?";
	eText[21] = "I beg your pardon?";
	eText[22] = "Speak louder. I can't hear you!";
	eText[23] = "I don't understand that!";
	eText[24] = "I have no idea what you are talking about!";
	
	
	return eText[Math.round(1 * Math.random()*eText.length)];
}