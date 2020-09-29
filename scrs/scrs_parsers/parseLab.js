



//Begin a labyrinth
function startLab(xx,yy,num,ent,ext) {
	
	/*
	** xx = x to start in the maze
	** yy = y to start in the maze
	** num = which labyrinth we're in
	** ent = what happens when you get to the 3
	** ext = what happens when you get to the 4
	*/
	
	echo("You'll have to feel through the maze with your hands, as it's very dark. To navigate use the cardinal directions (north,south,east,west) or their first letters (n,s,e,w). It would be a good idea to make a map as you go!");
	x = xx;
	y = yy;
	currentLab = num;
	status = 2;
	labStart = ent;
	labEnd = ext;
}

//


function parseLab(input) {
	
	input = input.toLowerCase();
	
	req = [0,0];
	
	if(input == "look around") { return "It's too dark to see anything useful."; }
	
	
	if(input.indexOf("north") != -1 || input == "n") { req = [-1,0]; }
	if(input.indexOf("south") != -1 || input == "s") { req = [1, 0]; }
	if(input.indexOf("east")  != -1 || input == "e") { req = [0, 1]; }
	if(input.indexOf("west")  != -1 || input == "w") { req = [0,-1]; }
	
	var lbs = lab[currentLab];
	
	if(lbs[y + req[0]][x + req[1]] == 0 && (req[0] != 0 || req[1] != 0)) {
		x += req[1];
		y += req[0];
		return "OK.";
	} else {
		if(lbs[y + req[0]][x + req[1]] == 1) {
			return "You're against a wall.";
		}
		else if(lbs[y + req[0]][x + req[1]] == 2) {
			return "Dead end.";
		}
		else if(lbs[y + req[0]][x + req[1]] == 3) {
			status = 0;
			echo("You leave the labyrinth, entering " + roomList[labStart].pName + ".");
			loadRoom(labStart);
		}
		else if(lbs[y + req[0]][x + req[1]] == 4) {
			status = 0;
			echo("You leave the labyrinth, entering " + roomList[labEnd].pName + ".");
			loadRoom(labEnd);
		}
		else {
			return failure();
		}
	}
	
}

//IN THE LABYRINTH ARRAY,
//X IS [1]
//AND Y IS [0]

/*
*
* Guide:
*	0: Empty
*	1: Wall
*	2: Dead end
*	3: Entrance
*	4: Exit
*
*/