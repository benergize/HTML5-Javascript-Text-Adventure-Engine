

/*__________________________________________________________________________________
//
//	FILENAME: preParse.js
//	AUTHOR: Ben Ehrlich
//	PURPOSE: This script contains some sample objects that get reused in the dungeon.
//	(cont.) Implementation of bottles currently limits players to one bottle (I 
//	(cont.) I think?).	
//
//
*/


//Empty bottle (in inventory)
var obj_emptyBottle = {
	name:"bottle",
	pName:"empty bottle",
	sight:"It's a pretty little glass bottle.",
	touch:"The glass is very smooth and well blown",
	smell:"Smells empty.",
	taste:"It's empty.",
	take:function(){
		if(!invCheck("bottle")) {
			inventory.push(obj_emptyBottle);
			removeObject(currentRoom,"bottle");
			echo("You take the empty bottle.");
			findInInventory("bottle").take = "You already have it!";
		} else {
			echo("Better not carry around too many of those.");
		}
	},
	fill:function(){
		if(checkRoom("healthLiquid")) {
			echo("You scoop some of the glowing liquid into your empty bottle.");
			invRemove("bottle");
			inventory.push(obj_healthPotion);
		} else { echo("There's nothing to fill it with."); }
	}
};


var obj_healthPotion = {
	name:"potion",
	pName:"health potion",
	sight:"It's a pretty little glass bottle filled with glowing blue liquid.",
	touch:"The glass is very smooth and well blown",
	smell:"Smells like life fire.",
	taste:function(){
		echo("You uncork the bottle and take a swift drink. Your senses feel completely rejuvenated.");
		echo("Your health and mana are at their max.");
		hp = maxhp;
		invRemove("potion");
		inventory.push(obj_emptyBottle);
	},
	take:function(){
		if(!invCheck("potion")) {
			inventory.push(obj_emptyBottle);
			removeObject(currentRoom,"bottle");
			echo("You take the health potion.");
		} else {
			echo("Better not carry around too many of those.");
		}
	},
	combatReady:true,
	type:"item",
	effect:40,
	combatUse:function(){
		hp += 40;
		echo("You heal for 40!");
		invRemove("potion");
		inventory.push(obj_emptyBottle);
	}
};

//Constructor to create doors. This is really useful.
function door(direction,roomToLoad) {
	
	if(direction == "n") { direction = "north"; }
	if(direction == "s") { direction = "south"; }
	if(direction == "e") { direction = "east"; }
	if(direction == "w") { direction = "west"; }
	
	this.name = direction;
	this.pName = direction + "ward door";
	this.sight = "A non-descript wooden door leading " + direction + ".";
	this.enter = function(){ loadRoom(roomToLoad) };
}

