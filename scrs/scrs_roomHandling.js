

/*__________________________________________________________________________________
//
//	FILENAME: scrs_roomHandling.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: Various functions that assist in the manipulation of rooms and the
//	(cont.)  objects within them.	
//
//
*/


//Return the room array position in roomList.
//We use this to convert room names into room numbers
//which is something we should have done in UGD.
function getRoomNumberByName(name) {
	for(var v = 0; v < roomList.length; v++) {
		if(roomList[v].name != undefined) {
			if(roomList[v].name == name) {
				return v;
			}
		}
	}
	
	console.log("getRoomNumberByName('" + name + "'): Room not found!");
	return false;
}


//Load a room
function loadRoom(room) {
	
	//Swap the room name for its array position if room is a string
	if(typeof room === "string") { room = getRoomNumberByName(room); }
	
	roomObjects = roomList[room].roomObjects;
	previousRoom = currentRoom;
	currentRoom = room;
	
	if(typeof roomList[room].intro === "string") { echo(roomList[room].intro); }
	else if(typeof roomList[room].intro === "function") { roomList[room].intro(); }
	
}


//Check if an object is in a room
function checkRoom(room,name) {
	
	//Swap the room name for its array position if room is a string
	if(typeof room === "string") { room = getRoomNumberByName(room); }
	
	//Run through objects in specified room
	for(var v = 0; v < roomList[room].roomObjects.length; v++) {
		
		//Check if object to check is in room
		if(roomList[room].roomObjects[v].name == name) {
			return true;
		}
	}
	
	//Object isn't in room
	return false;
}



//Return an object in the roomList
function findObject(room,name) {
	
	//Swap the room name for its array position if room is a string
	if(typeof room === "string") { room = getRoomNumberByName(room); }
	
	//Run through all objects in the specified room
	for(var f = 0; f < roomList[room].roomObjects.length; f++) {
		
		//Check if object matches
		if(roomList[room].roomObjects[f].name == name) {
			
			//Return object
			return roomList[room].roomObjects[f];
		}
	}
	
	//Object wasn't found
	return false;
}



//Remove an object from a room
function removeObject(room,name) {

	//Swap the room name for its array position if room is a string
	if(typeof room === "string") { room = getRoomNumberByName(room); }
	
	//Run through all objects in specified room
	for(var f = 0; f < roomList[room].roomObjects.length; f++) {
		
		//If the specified object is found
		if(roomList[room].roomObjects[f].name == name) {
			
			//Destroy it
			roomList[room].roomObjects.splice(f,1);
			
			//Return success
			return true;
		}
	}
	
	//Object wasn't found
	return false;
}

//Returns a room object by name
function findRoom(roomName) {
	
	for(var v = 0; v < roomList.length; v++) {
		if(roomList[v].name == roomName) {
			return roomList[v];
		}
	}
	return false;
}