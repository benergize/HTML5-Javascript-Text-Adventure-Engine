

/*__________________________________________________________________________________
//
//	FILENAME: scr_commandLine.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Some non-game related functions. These mostly control the command line
//	(cont.) buffer, or print information.
//
//
*/


//Returns command line help
function help() {
    
    //Clear screen
	cls();
    
	var helpText = "Welcome to my world, adventurer. Here's some useful information:";
	helpText += "<br><br>";
	helpText += "To interact with the world, enter a query into the command line. You already did this to get to this message, so good for you. For an overview of what's nearby, type 'look around.' To get the room description again, type 'description.' You'll definitely miss something if you don't look around!";
	helpText += "<br><br>";
	helpText += "Just about all queries should be written in two to three words. Words like 'the,' 'to,' 'it,' etc, are usually ignored, so queries should be structured as an action and an object, like 'smell sign.' Doors should be referred to by their cardinal direction (ie 'northern door' should be referred to as 'north'). For a list of visible exits, type 'exits.' To go a direction you can type north, south, east, west, or just the first letter.";
	helpText += "<br><br>";
	helpText += "You can take some items in the dungeon with you. To take inventory of what you have, type 'inventory.' You can manipulate items you've taken using the same format as items in the room.";
	helpText += "<br><br>";
	helpText += "If you get stuck, try experimenting. The five senses are usually a safe bet for finding information, but other action words just might help you too...";
	helpText += "<br><br>";
	helpText += "Command line specific words include:";
	helpText += "<br>";
	helpText += "<i style = 'white-space:pre'>  </i>HELP.......Displays this help prompt... dummy.<br>";
	helpText += "<i style = 'white-space:pre'>  </i>CLS........Clears the screen of its text.<br>";
	helpText += "<i style = 'white-space:pre'>  </i>SAVE.......Creates a save file for your current game. Save often!";
	
	//hack
	if(status == 2) { helpText = "You're in a deep dark labyrinthian maze with no light source. To navigate use the cardinal directions (north,south,east,west) or their first letters (n,s,e,w). It would be a good idea to make a map as you go.<br/><br/>"; }
	
	return helpText;
} 

function about() {
	cls();
	echo("Your about text here.");
	
	//It's a violation of the license to remove this line.
	echo("ENGINE CREATED BY <a href = 'http://www.benergize.com'>BEN EHRLICH</a>");
}

//Generate Transcript
//You can do better than this
function tscpt() {
	return "<a href = '#' onclick = 'myWindow = window.open(\"\", \"TRANSCRIPT\", \"width=640px, height=480px, scrollbars=1\");myWindow.document.write(globalTranscript);'>transcript available</a>";
}

//Save
function save() {
	
	//Send AJAX request
	var fd = new FormData();	
	fd.append('data',saveFile);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'loadGame.php?action=save');
	xhr.onload = function() {echo(xhr.responseText);};
	xhr.send(fd);

}

//Good luck with this.
function load(e) {
	
	
	var fd = new FormData();	
	fd.append('data',e);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'loadGame.php?action=load&position=' + e); 
	
	xhr.onload = function() {
		var response = xhr.responseText;
		console.log(response);
		
		//echo("<div style = 'text-align:center'><strong><em>(Loading...)</em></strong></div>");
		
		if(response == "dbe") { echo("Database error&mdash;couldn't load save."); }
		else if(response == "ncd") { echo("No data recieved from client!"); }
		else if(response == "fnf" || response.search("<b>Warning</b>") != -1) { echo("File not found!"); enterContinues(function(){cls();doLoad();}); }
		else {
			
			var loadData = response.split(",");
			
			Math.seedrandom(parseFloat(loadData[0]));
			
			saveFile = loadData[0] + ",";
			
			for(var v = 1; v < loadData.length; v++) {
				if(loadData[v] != "") { 
					echo("> " + loadData[v]); 
					saveFile += loadData[v] + ",";
					echo(preParse(loadData[v]));
				}
			}
			
			echo("<div style = 'text-align:center'><strong><em>(Loaded.)</em></strong></div>");
		}
		
	};
	xhr.send(fd);
	
}

//Clear screen buffer
function cls() {
	document.getElementById("pane").innerHTML = "";
}


//Write a line to the buffer
function echo(e) {
	if(e != undefined) {
		document.getElementById('pane').innerHTML += e + "<br><br>";
		globalTranscript += e + "<br><br>";
		document.getElementById('biggerPane').scrollTop = document.getElementById('biggerPane').scrollHeight;
	}
}


//Write a line to the buffer, adding a link if we're in mobile.
function echoM(e,link) {
	if(e != undefined) {
		if(userAgent != "mobile") {
			document.getElementById('pane').innerHTML += e + "<br><br>";
			globalTranscript += e + "<br><br>";
		} else {
			document.getElementById('pane').innerHTML += "<a href = '#' onclick = 'preParse(\"" + link + "\")'>" + e + "</a><br><br>";
			globalTranscript += e + "<br><br>";
		
		}
		document.getElementById('biggerPane').scrollTop = document.getElementById('biggerPane').scrollHeight;
	}
}


//Change font
function changeFont() {
	if(fontTicker < fontTable.length - 1) { fontTicker++; }
	else { fontTicker = 0; }
	document.body.style.fontFamily = fontTable[fontTicker];
	document.getElementById("pane").style.fontFamily = fontTable[fontTicker];
	document.getElementById("fudge").style.fontFamily = fontTable[fontTicker];
	return "Font changed.";
}


fullScreenIn = false; 
function fullScreen() {
	if(!fullScreenIn) {
		if(document.requestFullscreen) {
			document.requestFullscreen();
		} else if(document.mozRequestFullScreen) {
			document.mozRequestFullScreen();
		} else if(document.webkitRequestFullscreen) {
			document.webkitRequestFullscreen();
		} else if(document.msRequestFullscreen) {
			document.msRequestFullscreen();
		}// Launch fullscreen for browsers that support it!
	//	launchIntoFullscreen(document.documentElement); // the whole page
		//launchIntoFullscreen(document.getElementById("videoElement")); // any individual element
	}
}



fns = 0;