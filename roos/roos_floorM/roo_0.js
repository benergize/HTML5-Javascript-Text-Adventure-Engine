//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	Filename: roo_0.js
//	Author: Ben Ehrlich
//  Desc: A sample room to show off how rooms are put together.
//
//


//Create a door using the door constructor.
var obj_0_north = new door("north","roo_chasm");


var obj_0_table = {
	name:"table",
	pName:"mahogany table",
	sight:"A beautifully crafted table.",
	touch:"The wood is smooth and well sanded.",
	taste:"Tastes a little dusty.",
	smell:"The air is clean and crisp, and smells slightly of pine."
}


var obj_0_rock = {  
	name:"rock",
	aliases:["worthless","stone"],
	pName:"worthless rock",
	sight:"It's a super useless rock. It's not bad or anything, it just doesn't do anything.",
	smell:"It smells like a rock that's just a regular rock and doesn't do anything.",
	taste:"It tastes like a rock that doesn't do anything. It's just a rock.",
	touch:"You touch the useless rock. It feels like a rock... that's pretty useless.",
	take:function(){
		echo("...okay... You take the completely useless rock that is just a rock and is not going to help you in any way throughout the game, but is just, in fact, a rock. You can type 'INVENTORY' at any time to view your inventory, and use 'DROP' to drop something you've collected.");
		inventory.push(obj_0_rock);
		removeObject(0,"rock");
		score += 15;
	},
	toss:function(){
		if(roomList[currentRoom].name == "roo_chasm") {
			invRemove("rock");
			echo("You throw the rock down the chasm. That was pretty satisfying.");
		} else {
			echo("No reason to do that here.");
		}
	}
}


var room_0 = {
	name:"roo_testRoom",
	pName:"Test Room",
	intro:"You're in a testing room. There's little to see here, but check the source for insight into how rooms work.",
	roomObjects: [
		obj_0_north,
		obj_0_table,
		obj_0_rock
	]
}

//Add this room to the room list array
roomList.push(room_0);