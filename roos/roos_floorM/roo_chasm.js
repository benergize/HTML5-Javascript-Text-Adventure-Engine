//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	Filename: roo_chasm.js
//	Author: Ben Ehrlich
//  Desc: A sample room to show off how rooms are put together.
//	(cont.) Note that this room uses the obj_roomName_object
//	(cont.) convention vs the obj_roomNumber_object convention.
//	(cont.) The choice is yours.
//


//Create a door using the door constructor.
var obj_chasm_south = new door("south","roo_testRoom");


var obj_chasm_gorge = {
	name:"gorge",
	aliases:["chasm","cliff","sarlac"],
	pName:"massive gorge",
	sight:"It's really wide!",
	enter:function(){
		hp = -1;
		checkHp("You jump off the cliff and die. Happy?");
	}
}


var room_chasm = {
	name:"roo_chasm",
	pName:"Chasm",
	intro:"You enter a chasm. There's nothing here but a gorge and a door leading back to where you came from.",
	roomObjects: [
		obj_chasm_gorge,
		obj_chasm_south
	]
}

//Add this room to the room list array
roomList.push(room_chasm);