

/*__________________________________________________________________________________
//
//	FILENAME: pageHandling.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Functions that control interaction between the HTML elements on the 
//	(cont.) page and all the javascript involved in the game.
//
//
*/


//Send the raw data from the text box to the pre-parser
//This is where the HTML gets sent to JS. It's pretty rad.
function submitQuery() {

	//Sanitize user input
	eval = document.getElementById('fudge').value.replace(/[\|&;\$%@"'<>\(\)\,]/g, "");
	
	//Print the user input to the line
	echo("> " + eval);
	
	//Store evaluated text
	parsed = preParse(eval);
	
	//Set previous query
	previousQuery.push(eval);
	
	//Add input to save file--remember
	//though, the save file doesn't mean
	//anything unless the user actually enters
	//'save.'
	saveFile += eval + ",";
	
	//If the response to the input isn't blank, print it to the buffer
	if(parsed != "" && parsed != undefined) { echo(parsed); }
	
	//Clear the input box
	document.getElementById('fudge').value = "";
	
	//And focus on it
	document.getElementById('fudge').focus();
}


//Keypress handling
$(document).ready(function(){
	$("#fudge").filter(":text").keydown( function(event) {
		
		//Enter
		if(event.keyCode == 13) {
			submitQuery();
			queryTicker++;
		}
		
		//Up
		if(event.keyCode == 38) {
			if(queryTicker > 0) {  
				queryTicker--;
				document.getElementById('fudge').value = previousQuery[queryTicker];
			}
		}
		
		//Down
		if(event.keyCode == 40) {
			if(queryTicker < previousQuery.length - 1) {
				queryTicker++;
				document.getElementById('fudge').value = previousQuery[queryTicker];
			}
		}
	});
});


//Resize text to mostly fit window.
//This could be done better.
function doResize() {

	var newFontSize = Math.sqrt(document.body.clientWidth*(20/1280) * document.body.clientHeight*(20/720)) + "px"; 
	
	document.getElementsByTagName("body")[0].style["font-size"] = newFontSize;
	document.getElementsByTagName("body")[0].style["overflow"] = "hidden";
	
	document.getElementById("fudge").style["font-size"] = newFontSize;
	document.getElementById('fudge').focus();
}
